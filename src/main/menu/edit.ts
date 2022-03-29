// 编辑功能菜单

import { Menu, MenuItem, ipcMain, BrowserWindow, MenuItemConstructorOptions } from 'electron'

//  监听事件
ipcMain.on('showEditMenu', (event) => {
  const { sender } = event
  const template: MenuItemConstructorOptions[] = [
    {
      label: '标记完成',
      click: () => { sender.send('showEditMenu-callback', 0) }
    },
    { type: 'separator' },
    {
      label: '编辑',
      click: () => { sender.send('showEditMenu-callback', 1) }
    },
    {
      label: '删除',
      click: () => { sender.send('showEditMenu-callback', 2) }
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.on('menu-will-close', () => {
    // sender.send('showEditMenu-callback', -1)
  })
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup({
    window: win
  })
})
