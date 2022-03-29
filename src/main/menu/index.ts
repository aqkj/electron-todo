// 入口

import { Menu, MenuItem, ipcMain, BrowserWindow, MenuItemConstructorOptions } from 'electron'
import './add'




ipcMain.handle('showMenu', (event, menuList) => {
  return new Promise(resolve => {
    // 创建菜单模版
    const template: MenuItemConstructorOptions[] = menuList.map(item => ({
      label: item.label,
      click: () => { resolve(item.value) }
    }))
    // 生成menu
    const menu = Menu.buildFromTemplate(template)
    // 监听关闭
    menu.on('menu-will-close', () => {
      // 下一次事件循环执行
      setImmediate(() => {
        resolve(-1)
      })
    })
    // 获取win对象
    const win = BrowserWindow.fromWebContents(event.sender)
    // 打开弹窗
    menu.popup({
      window: win
    })
  })
})