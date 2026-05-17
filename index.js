import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        icon: join(__dirname, 'icon.ico'),
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    //win.loadFile(join(__dirname, 'dist/index.html'));
    win.loadURL('http://localhost:5173/')

    win.on('closed', () => app.quit());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('open-url', (e, url) => {
    shell.openExternal(url);
});

ipcMain.on('close-app', () => {
    app.quit();
});