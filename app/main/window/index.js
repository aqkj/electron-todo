"use strict";
// 窗口
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWindow = void 0;
const electron_1 = require("electron");
require("./manage");
const config_1 = require("./config");
/**
 * 初始化窗口
 */
function initWindow() {
    // 创建窗口
    const win = new electron_1.BrowserWindow({
        // 宽度
        width: config_1.defaultWindowWidth,
        maxWidth: config_1.defaultWindowWidth,
        minWidth: config_1.defaultWindowWidth,
        // 高度
        height: config_1.defaultWindowHeight,
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
    // 加载html
    win.loadFile(config_1.defaultHtmlPath);
    // win.webContents.openDevTools()
    return win;
}
exports.initWindow = initWindow;
