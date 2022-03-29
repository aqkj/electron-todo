// 状态管理
import { randomKey } from '../math'
const { ipcRenderer } = window

export default class MainStore {
  /**
   * 获取对应key的value
   * @param key 唯一
   * @returns {Promise<string>} 返回获取的值
   */
  static get(key: string): Promise<string> {
    return new Promise((resolve) => {
      const code = randomKey()
      ipcRenderer.once(`store.get-${code}callback`, (_, val) => {
        resolve(val)
      })
      ipcRenderer.send('store.get', key, code)
    })
  }
  /**
   * 设置存储
   * @param key 唯一
   * @param val 值
   */
  static set<T>(key: string, val: T) {
    ipcRenderer.send('store.set', key, val)
  }
}
