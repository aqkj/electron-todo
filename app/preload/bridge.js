"use strict";
// 全局暴露
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBridge = void 0;
const electron_1 = require("electron");
const ons = [];
const offs = [];
function initBridge() {
    // 注册bridge功能
    electron_1.contextBridge.exposeInMainWorld('ipcRenderer', Object.assign(Object.assign({}, electron_1.ipcRenderer), { on: (channel, listener) => {
            electron_1.ipcRenderer.on(channel, listener);
        }, off: (channel, listener) => {
            electron_1.ipcRenderer.off(channel, listener);
        }, once: (channel, listener) => {
            electron_1.ipcRenderer.once(channel, listener);
        } }));
}
exports.initBridge = initBridge;
