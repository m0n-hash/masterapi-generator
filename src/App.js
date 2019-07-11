import React from 'react';
import logo from './logo.svg';
import './App.css';
import deviceUUID from "device-uuid";

const electron = window.electron;
const {dialog}=window.electron.remote;
const git=window.git;
const fs=window.fs;

function onClick(){
  console.log(dialog);
  //dialog.showErrorBox("test","test err 2!");
  dialog.showOpenDialog({ 
    properties: ['openDirectory','createDirectory','promptToCreate'],
    defaultPath :'D:\\Yoe Tha\\Web\\Master Api (spring-boot)\\api-generator\\react',
    message :"Git Clone",
     
  },function(filePaths,bookMarks){
    console.log(filePaths[0]);
    git.Clone("https://github.com/SundewMyanmar/master-api.git",filePaths[0]).then(function(repository){
      console.log('test');
    },function(error){
      console.log(error);
    });  
  })
  //mainProcess.selectDirectory();
}

function onClickReadFile(){
  console.log(fs);
  
  fs.readFile('D:\\hluttaw.txt',function(err,data){
    if(err){
      return console.error(err);
    }
    console.log(data.toString());
  })
}

function App() {
  var uuid=deviceUUID.DeviceUUID().get();
  var device=deviceUUID.DeviceUUID().parse();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={()=>{
            onClick();
        }} id="party" class="very-sweet-looking">Open</button>

        <button onClick={()=>{
            onClickReadFile();
        }} id="party" class="very-sweet-looking">Read File</button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React v{React.version}
        </a>
        <p>
        OS - {device.os}<br/>
        Browser - {device.browser}<br/>
        Platform - {device.platform}<br/>
        UUID - {uuid}
        </p>
        <a
          className="App-link"
          href="https://medium.com/@brockhoff/using-electron-with-react-the-basics-e93f9761f86f"
          target="_blank"
          rel="noopener noreferrer"
        >
          ReactJs & Electron
        </a>
        <a 
          className="App-link"
          href="https://blog.csdn.net/zoepriselife316/article/details/89920309"
          target="_blank"
          rel="noopener noreferrer"
          >
            require('electron')
          </a>
          <a 
          className="App-link"
          href="https://electronjs.org/docs/api/dialog"
          target="_blank"
          rel="noopener noreferrer"
          >
            Electron dialog
          </a>
          <a 
          className="App-link"
          href="https://github.com/nodegit/nodegit/issues/1259"
          target="_blank"
          rel="noopener noreferrer"
          >
            var Git = require("nodegit"); was compiled against a different Node.js version
          </a>
          <a 
          className="App-link"
          href="https://dev.to/aurelkurtula/creating-a-text-editor-in-electron-reading-files-13b8"
          target="_blank"
          rel="noopener noreferrer"
          >
            fs Electron File Read/Write
          </a>
          <a 
          className="App-link"
          href="https://www.npmjs.com/package/react-ace"
          target="_blank"
          rel="noopener noreferrer"
          >
            react-ace Code Viewer
          </a>
          
      </header>
    </div>
  );
}

export default App;
