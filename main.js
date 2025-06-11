const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        // kiosk: true, // Enable kiosk mode
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'), // optional
            // nodeIntegration: true, // only use if needed
            // contextIsolation: false // only disable if using nodeIntegration
        }
    });

    win.loadFile('index.html'); // Load your main HTML
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
