// 窗口

import { BrowserWindow, ipcMain } from "electron";
import path from 'path'
import './manage'
import {
  defaultHtmlPath,
  defaultPreloadPath,
  defaultWindowHeight,
  defaultWindowWidth
} from './config'
import { closeOtherWindow, createWindow } from './window'
// 主窗口全局变量
let mainWindow: BrowserWindow = null
/**
 * 初始化窗口
 */
export function initWindow() {
  // 创建窗口
  mainWindow = createWindow({
    // 宽度
    width: defaultWindowWidth,
    maxWidth: defaultWindowWidth,
    minWidth: defaultWindowWidth,
    // 高度
    height: defaultWindowHeight,
    // 标题栏样式
    titleBarStyle: 'hidden',
    // titleBarOverlay: true,
    // 禁止缩放
    fullscreenable: false,
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
  })
  // 主窗口隐藏时把其他窗口都进行关闭
  mainWindow.on('hide', () => {
    // 关闭其他窗口
    closeOtherWindow(mainWindow)
  })
  return mainWindow
}

/**
 * 切换显示
 * @param {boolean} isShow 是否显示
 */
export function toggleMainWindow() {
  // 是否可见
  if (mainWindow.isVisible()) {
    // 隐藏
    mainWindow.hide()
  } else {
    // 显示
    mainWindow.show()
  }
}