"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const config_1 = require("./config");
const window_1 = require("./window");
let win = null;
electron_1.ipcMain.handle('showManage', event => {
    return new Promise(resolve => {
        if (win) {
            win.show();
            win.focus();
        }
        else {
            win = (0, window_1.createWindow)({
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
            }, '#/manage');
            win.removeAllListeners('close');
            win.addListener('close', () => {
                win = null;
            });
            resolve(0);
        }
    });
});
