/**
 * 入口文件
 */
import { app, BrowserWindow } from 'electron'
import path from 'path'
import { initUpdate } from './update'
import './menu'
import './store'
import { initWindow } from './window'
// console.log()
// 准备就绪
app.whenReady().then(() => {
  // 初始化窗口
  initWindow()
  // 初始化更新
  initUpdate()
})