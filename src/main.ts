import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null;
const sharedMemory = { counter: 0 };

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle IPC messages from the renderer
    ipcMain.on('get-counter', (event) => {
        event.reply('counter-value', sharedMemory.counter);
    });

    ipcMain.on('increment-counter', () => {
        sharedMemory.counter += 1;
        mainWindow?.webContents.send('counter-value', sharedMemory.counter);
    });

    ipcMain.on('decrement-counter', () => {
        sharedMemory.counter -= 1;
        mainWindow?.webContents.send('counter-value', sharedMemory.counter);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
