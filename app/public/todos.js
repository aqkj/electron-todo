"use strict";
// 任务
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosFromDate = void 0;
/**
 * 通过时间获取任务
 * @param todoList 任务列表
 * @param date 时间
 * @returns {ITodoItem[]} 返回对应时间的任务
 */
function getTodosFromDate(todoList, date) {
    return todoList.filter(todo => {
        const [startDate, endDate] = todo.dateRange;
        const week = date.getDay();
        return new Date(startDate) < date && new Date(endDate) > date && todo.days.includes(week);
    });
}
exports.getTodosFromDate = getTodosFromDate;
