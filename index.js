import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

    win.loadURL('http://localhost:5173/')
}

app.whenReady().then(createWindow)

ipcMain.on('open-url', (e, url) => {
    shell.openExternal(url)
})

ipcMain.on('close-app', () => {
    app.quit()
})