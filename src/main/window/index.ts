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


/**
 * 初始化窗口
 */
export function initWindow() {
  // 创建窗口
  const win = new BrowserWindow({
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
  // 加载html
  win.loadFile(defaultHtmlPath)
  // win.webContents.openDevTools()
  return win
}
