// 创建功能菜单

import { Menu, MenuItem, ipcMain, BrowserWindow, MenuItemConstructorOptions } from 'electron'

// const addMenu = new Menu()
// // 当日日程菜单
// addMenu.append(new MenuItem({
//   label: '添加当日日程'
// }))
// // 每日日程菜单
// addMenu.append(new MenuItem({
//   label: '添加每日日程',
//   click: () => {

//   }
// }))
//  监听事件
ipcMain.on('showAddMenu', (event) => {
  // console.log('hhh', event)
  const { sender } = event
  const template: MenuItemConstructorOptions[] = [
    {
      label: '添加日程',
      click: () => { sender.send('showAddMenu-callback', 0) }
    },
    // { type: 'separator' },
    // {
    //   label: '添加每日日程',
    //   click: () => { sender.send('showAddMenu-callback', 1) }
    // }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.on('menu-will-close', () => {
    // sender.send('showAddMenu-callback', -1)
  })
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup({
    window: win
  })
})
