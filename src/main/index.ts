/**
 * 入口文件
 */
import { app, BrowserWindow } from 'electron'
import path from 'path'
import { initUpdate } from './update'
import { initTray } from './tray'
import './menu'
import './store'
import { initWindow } from './window'
// 是否想要关闭
export let willQuit = false
// console.log()
// 准备就绪
app.whenReady().then(() => {
  // 初始化托盘图标
  initTray()
  // 初始化窗口
  initWindow()
  // 初始化更新
  initUpdate()
})
/**
 * 关闭前
 */
app.on('before-quit', () => {
  willQuit = true
})