import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEV_URL = "http://localhost:49173";

function server() {
    const dev = spawn('npm.cmd', ['run', 'dev'], {
        shell: true,
        stdio: 'inherit',
        windowsHide: true
    });
}

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

    win.loadURL(DEV_URL);
}

app.whenReady().then(() => {
    createWindow();
    server();
});

ipcMain.on('open-url', (e, url) => {
    shell.openExternal(url);
});

ipcMain.on('close-app', () => {
    app.quit();
});