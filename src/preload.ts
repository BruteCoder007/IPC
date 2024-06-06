import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    getCounter: () => ipcRenderer.send('get-counter'),
    incrementCounter: () => ipcRenderer.send('increment-counter'),
    decrementCounter: () => ipcRenderer.send('decrement-counter'),
    onCounterValue: (callback: (event: any, value: number) => void) => ipcRenderer.on('counter-value', callback)
});
