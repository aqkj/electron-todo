// 托盘图标
import { Tray, Menu } from 'electron'
import debounce from 'lodash/debounce'
import path from 'path'
import { toggleMainWindow } from '../window'


let tray: Tray = null
let defaultTitle = ''
const trayIconPath = path.join(__dirname, '../../../public/images/tray.png')
/**
 * 初始化托盘图标
 */
export function initTray() {
  tray = new Tray(trayIconPath)
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1', type: 'radio' },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' }
  // ])
  tray.setToolTip('我的日程管理软件.')
  // tray.setContextMenu(contextMenu)
  tray.addListener('click', debounce(() => {
    toggleMainWindow()
  }, 100))
  updateTitle('今日任务剩余0')
}
/**
 * 更新标题
 * @param {string} title 标题
 */
export function updateTitle(title: string) {
  // 判断相同则不修改
  if (defaultTitle === title) return
  defaultTitle = title
  tray.setTitle(` ${title}`)
}