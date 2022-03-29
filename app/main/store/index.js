"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
// 状态存储
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
exports.store = new electron_store_1.default();
// 事件数组
const actions = ['set', 'get', 'delete'];
// 遍历添加事件
actions.forEach(action => {
    electron_1.ipcMain.on(`store.${action}`, (event, ...args) => {
        // console.log(`store.${action}`, args)
        let code = '';
        const { sender } = event;
        // 如果请求方法为get
        if (action === 'get') {
            code = args[1];
            args[1] = '';
        }
        const result = exports.store[action](...args);
        console.log(`store.${action}-${code}callback`, args);
        sender.send(`store.${action}-${code}callback`, result);
    });
});
