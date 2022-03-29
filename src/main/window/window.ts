// 窗口创建
import { BrowserWindow } from 'electron'
import { isDev } from '../env'
import { defaultHtmlPath } from './config'
// 加载路径方式，根据环境显示
const loadFunKey = isDev ? 'loadURL' : 'loadFile'
// 暂存窗口
const windows = new Set<BrowserWindow>()
/**
 * 创建窗口
 * @param options 配置
 * @param path 路径
 */
export function createWindow(options: Electron.BrowserWindowConstructorOptions, hash = '') {
  // 创建窗口
  const win = new BrowserWindow(options)
  // 加载路径
  win[loadFunKey](`${defaultHtmlPath}${isDev ? hash : ''}`, {
    hash
  })
  // 开发环境默认打开devtools
  if (isDev) {
    win.webContents.openDevTools()
  }
  // 插入
  windows.add(win)
  // 检测关闭，移除
  win.addListener('close', e => {
    // 阻止默认事件
    e.preventDefault()
    // 隐藏窗口
    win.hide()
  })
  // 判断是否关闭，关闭则删除
  win.addListener('closed', () => {
    // 删除
    windows.delete(win)
  })
  return win
}
/**
 * 获取当前所有显示的窗口
 * @returns {BrowserWindow[]} 窗口数组
 */
export function getAllWindows(): BrowserWindow[] {
  return Array.from(windows)
}
/**
 * 关闭其他窗口
 * @param {BrowserWindow} win 窗口
 */
export function closeOtherWindow(win: BrowserWindow) {
  // 遍历
  windows.forEach(item => {
    // 如果相同，则不处理
    if (win === item) return
    // 关闭窗口
    item.close()
  })
}