Main Process
Role: The main process manages the application lifecycle and window creation. It has direct access to Node.js APIs and can perform tasks like file system access and creating child processes.

Shared Memory Simulation: A JavaScript object acts as shared memory. This object stores the counter value that will be shared between the main process and renderer processes.

IPC Handling: The main process listens for messages from the renderer process using ipcMain.on(). When it receives messages to increment or decrement the counter, it updates the shared memory and sends the updated counter value back to the renderer process using event.reply().

Preload Script
Role: The preload script runs in a secure, isolated context before other scripts in the renderer process. It acts as a bridge between the main process and the renderer process.

Exposing IPC Methods: The preload script uses contextBridge.exposeInMainWorld() to safely expose IPC methods to the renderer process. This allows the renderer process to send and receive messages without direct access to Node.js APIs, enhancing security.

Renderer Process
Role: The renderer process handles the user interface (UI). It runs web technologies (HTML, CSS, JavaScript) and interacts with the user.

User Interaction: When the user clicks buttons to increment or decrement the counter, the renderer process sends IPC messages to the main process via the exposed methods from the preload script.

Receiving Updates: The renderer process listens for messages from the main process that contain the updated counter value. When it receives these messages, it updates the UI to reflect the new counter value.

HTML File
Role: The HTML file provides the structure for the user interface. It includes elements like buttons and a display area for the counter.

How It All Works Together
User Interaction: The user clicks a button in the UI, triggering an event in the renderer process.
IPC Message Sent: The renderer process sends an IPC message to the main process, requesting an increment or decrement of the counter.
Main Process Updates Shared Memory: The main process updates the counter value in the shared memory object and sends the new value back to the renderer process.
UI Update: The renderer process receives the updated counter value and updates the display in the UI.
Summary
This example demonstrates a basic form of IPC where the main process and renderer process communicate to keep a shared counter value synchronized. The main process acts as the central store of the counter value, and the renderer process interacts with it through IPC messages, ensuring that user interactions in the UI are reflected in the shared counter value.
