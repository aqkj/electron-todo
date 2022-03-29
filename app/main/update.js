"use strict";
// 更新逻辑
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUpdate = void 0;
const notification_1 = require("./notification");
/**
 * 初始化更新
 */
function initUpdate() {
    // 定时器
    setInterval(() => {
        // 检测任务
        (0, notification_1.checkTodosAndNotification)();
    }, 1000);
}
exports.initUpdate = initUpdate;
