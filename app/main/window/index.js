"use strict";
// 窗口
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMainWindow = exports.initWindow = void 0;
require("./manage");
const config_1 = require("./config");
const window_1 = require("./window");
// 主窗口全局变量
let mainWindow = null;
/**
 * 初始化窗口
 */
function initWindow() {
    // 创建窗口
    mainWindow = (0, window_1.createWindow)({
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
    // 主窗口隐藏时把其他窗口都进行关闭
    mainWindow.on('hide', () => {
        // 关闭其他窗口
        (0, window_1.closeOtherWindow)(mainWindow);
    });
    return mainWindow;
}
exports.initWindow = initWindow;
/**
 * 切换显示
 * @param {boolean} isShow 是否显示
 */
function toggleMainWindow() {
    // 是否可见
    if (mainWindow.isVisible()) {
        // 隐藏
        mainWindow.hide();
    }
    else {
        // 显示
        mainWindow.show();
    }
}
exports.toggleMainWindow = toggleMainWindow;
