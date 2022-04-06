
import { BrowserWindow, ipcMain } from "electron";
import {
  defaultHtmlPath,
  defaultPreloadPath
} from './config'
import { createWindow } from './window'
let win: BrowserWindow = null
ipcMain.handle('showManage', event => {
  return new Promise(resolve => {
    if (win) {
      win.show()
      win.focus()
    } else {
      win = createWindow({
        width: 800,
        height: 600,
        // 标题栏样式
        titleBarStyle: 'hidden',
        // titleBarOverlay: true,
        // 禁止缩放
        fullscreenable: false,
        // 是否显示在最前方
        alwaysOnTop: true,
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
          preload: defaultPreloadPath
        }
      }, '#/manage')
      win.removeAllListeners('close')
      win.addListener('close', () => {
        win = null
      })
      resolve(0)
    }
  })
})