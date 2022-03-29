// 预加载脚本
import { initBridge } from './bridge'
initBridge()
/**
 * 加载完毕
 */
window.addEventListener('DOMContentLoaded', () => {
  // for (const idName of ['chrome', 'node', 'electron']) {
  //   const ele = document.getElementById(`${idName}-version`)
  //   ele.innerHTML = process.versions[idName]
  // }
})