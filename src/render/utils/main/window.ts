// 窗口


/**
 * 显示管理窗口
 */
export function showManageWindow() {
  const { ipcRenderer } = window
  return ipcRenderer.invoke('showManage')
}