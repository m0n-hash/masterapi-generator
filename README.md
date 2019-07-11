
# Master Api Generator

* [Generate Sundew Myanmar API](https://github.com/SundewMyanmar/master-api)
* Using ReactJs & Electron

## How to debug

Set **public/main.js** 
```
mainWindow.loadURL('http://localhost:3000/');
```

**~#** npm run start (run reactJs App)
**~#** npm run electron-start (run electron)

## How to package

Set **public/main.js** 
```
mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
```
**~#** npm run electron-pack (create installer)

## Credits

* [ReactJs & Electron](https://medium.com/@brockhoff/using-electron-with-react-the-basics-e93f9761f86f)
* [Import Electron](https://blog.csdn.net/zoepriselife316/article/details/89920309)
* [Electron dialog](https://electronjs.org/docs/api/dialog)
* [Import nodegit err: was compiled against a different Node.js version](https://github.com/nodegit/nodegit/issues/1259)
* [Electron File Read/Write](https://dev.to/aurelkurtula/creating-a-text-editor-in-electron-reading-files-13b8)
* [React Ace Code Viewer](https://www.npmjs.com/package/react-ace)
