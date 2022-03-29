// 主模块


/**
 * 显示添加弹窗
 * @returns {Promise<any>} 返回点击结果
 */
export function showAddMenu(): Promise<any> {
  return new Promise(resolve => {
    const { ipcRenderer } = window
    ipcRenderer.send('showAddMenu')
    ipcRenderer.once('showAddMenu-callback', (...args) => resolve(args))
  })
}
/**
 * 显示添加弹窗
 * @returns {Promise<any>} 返回点击结果
 */
export function showEditMenu(): Promise<any> {
  return new Promise(resolve => {
    const { ipcRenderer } = window
    ipcRenderer.send('showEditMenu')
    ipcRenderer.once('showEditMenu-callback', (...args) => resolve(args))
  })
}
/**
 * 菜单节点
 */
interface IMenuItem {
  /** 文本 */
  label: string
  /** 值 */
  value: number
}
/**
 * 显示弹窗
 * @returns {Promise<number>} 返回点击菜单的value
 */
export function showMenu(menus: IMenuItem[]): Promise<number> {
  const { ipcRenderer } = window
  return ipcRenderer.invoke('showMenu', menus)
}