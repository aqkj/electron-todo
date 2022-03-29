"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 入口文件
 */
const electron_1 = require("electron");
const update_1 = require("./update");
require("./menu");
require("./store");
const window_1 = require("./window");
// console.log()
// 准备就绪
electron_1.app.whenReady().then(() => {
    // 初始化窗口
    (0, window_1.initWindow)();
    // 初始化更新
    (0, update_1.initUpdate)();
});
