"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const config_1 = require("./config");
let win = null;
electron_1.ipcMain.handle('showManage', event => {
    return new Promise(resolve => {
        if (win) {
            win.focus();
        }
        else {
            win = new electron_1.BrowserWindow({
                width: 800,
                height: 600,
                // 标题栏样式
                titleBarStyle: 'hidden',
                // titleBarOverlay: true,
                // 禁止缩放
                fullscreenable: false,
                // 任务栏中显示
                skipTaskbar: true,
                // 背景透明
                // transparent: true,
                // transparent: true,
                // backgroundColor: '#00000000',
                // 无边框
                frame: false,
                // 是否可以最大化
                maximizable: false,
                webPreferences: {
                    // 预加载路径
                    preload: config_1.defaultPreloadPath
                }
            });
            win.loadFile(`${config_1.defaultHtmlPath}`, {
                hash: '#/manage'
            });
            win.show();
            win.on('close', () => {
                win = null;
            });
            resolve(0);
        }
    });
});
