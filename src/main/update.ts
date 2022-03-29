// 更新逻辑

import { checkTodosAndNotification } from './notification'
/**
 * 初始化更新
 */
export function initUpdate() {
  // 定时器
  setInterval(() => {
    // 检测任务
    checkTodosAndNotification()
  }, 1000)
}