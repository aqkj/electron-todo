"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 预加载脚本
const bridge_1 = require("./bridge");
(0, bridge_1.initBridge)();
/**
 * 加载完毕
 */
window.addEventListener('DOMContentLoaded', () => {
    // for (const idName of ['chrome', 'node', 'electron']) {
    //   const ele = document.getElementById(`${idName}-version`)
    //   ele.innerHTML = process.versions[idName]
    // }
});
