// 全局暴露

import { contextBridge, ipcRenderer } from 'electron'
const ons = []
const offs = []
export function initBridge() {
  // 注册bridge功能
  contextBridge.exposeInMainWorld('ipcRenderer', {
    ...ipcRenderer,
    on: (channel, listener) => {
      ipcRenderer.on(channel, listener)
    },
    off: (channel, listener) => {
      ipcRenderer.off(channel, listener)
    },
    once: (channel, listener) => {
      ipcRenderer.once(channel, listener)
    }
  })
}