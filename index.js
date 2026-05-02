import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let server;

function startServer() {
    server = spawn('npx.cmd', ['serve', 'dist', '-l', '49173'], {
        shell: true,
        stdio: 'ignore',
        windowsHide: true
    });
}

function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 900,
        frame: false,
        icon: join(__dirname, 'icon.ico'),
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    win.loadURL("http://127.0.0.1:49173");
}

app.whenReady().then(() => {
    startServer();
    createWindow();
});
ipcMain.on('open-url', (e, url) => {
    shell.openExternal(url)
})

ipcMain.on('close-app', () => {
    app.quit()
})