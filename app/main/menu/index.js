"use strict";
// 入口
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
require("./add");
electron_1.ipcMain.handle('showMenu', (event, menuList) => {
    return new Promise(resolve => {
        // 创建菜单模版
        const template = menuList.map(item => ({
            label: item.label,
            click: () => { resolve(item.value); }
        }));
        // 生成menu
        const menu = electron_1.Menu.buildFromTemplate(template);
        // 监听关闭
        menu.on('menu-will-close', () => {
            // 下一次事件循环执行
            setImmediate(() => {
                resolve(-1);
            });
        });
        // 获取win对象
        const win = electron_1.BrowserWindow.fromWebContents(event.sender);
        // 打开弹窗
        menu.popup({
            window: win
        });
    });
});
