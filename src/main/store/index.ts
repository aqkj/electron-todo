// 状态存储
import { ipcMain } from 'electron'
import Store from 'electron-store'
type TAction = 'set' | 'get' | 'delete'
export const store = new Store()
// 事件数组
const actions: TAction[] = ['set', 'get', 'delete']
// 遍历添加事件
actions.forEach(action => {
  ipcMain.on(`store.${action}`, (event, ...args) => {
    // console.log(`store.${action}`, args)
    let code = ''
    const { sender } = event
    // 如果请求方法为get
    if (action === 'get') {
      code = args[1]
      args[1] = ''
    }
    const result = (store[action] as any)(...args)
    console.log(`store.${action}-${code}callback`, args)
    sender.send(`store.${action}-${code}callback`, result)
  })
})
