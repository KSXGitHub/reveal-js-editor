const path = require('path');

const {dialog, BrowserWindow} = require('electron');

const fileDialog = require('./fileDialog');
const language = require('./language');

var bgWin;


function openBgWin(currentSettings) {
    bgWin = new BrowserWindow({
        parent: BrowserWindow.getFocusedWindow(),
        center: true,
        useContentSize: true,
        //alwaysOnTop: true,
        show: false,
        webPreferences: {
            devTools: true
        }
    });

    bgWin.setMenuBarVisibility(false);
    //bgWin.webContents.openDevTools();
    bgWin.loadURL('file://' + path.join(path.resolve('lib'), 'front', 'background', 'background.html'));

    bgWin.once('ready-to-show', () => {
        bgWin.webContents.send('init', currentSettings);
        bgWin.show();
    });
}

module.exports = {
    openBgWin,
    openImg: () => {fileDialog.openImg(bgWin)},
    openVideo: () => {fileDialog.openVideo(bgWin)},
    getText: language.getText
}