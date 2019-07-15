const {app,BrowserWindow} = require('electron')
const path = require('path')

function createWindow(){    
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: { 
            nodeIntegration: true
        }
    })

    //To Pack Electron
    //mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    
    //To Debug
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.setMenu(null);
    mainWindow.webContents.openDevTools();
}

app.on('ready',createWindow);