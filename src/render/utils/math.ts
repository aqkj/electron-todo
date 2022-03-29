// 数学方法


/**
 * 获取随机key
 * @returns {string} 随机数
 */
export function randomKey(): string {
  return `${Date.now()}${Math.random().toString(16).slice(2)}`
}