"use strict";
// 通知
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTodosAndNotification = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const electron_1 = require("electron");
const todos_1 = require("../../public/todos");
const store_1 = require("../store");
// 下一次通知的时间
let nextToastHours = 0;
/**
 * 获取当天任务
 * @param date 日期
 */
function getTodayTodos(date) {
    const todoListStr = store_1.store.get('todoList');
    const todoList = JSON.parse(todoListStr);
    return (0, todos_1.getTodosFromDate)(todoList, date);
}
/**
 * 获取未完成的任务
 * @param {Date} 时间
 * @param {ITodoItem[]} 任务列表
 * @returns {ITodoItem[]} 未完成的任务
 */
function getNotFinishedTodos(date, todos) {
    // 对应日期完成数据
    const completeMapStr = store_1.store.get('completeDateMap');
    const completeMap = JSON.parse(completeMapStr);
    const dateStr = (0, dayjs_1.default)(date).format('YYYY-MM-DD');
    const completeKeyArr = completeMap[dateStr] || [];
    return todos.filter(item => !completeKeyArr.includes(item.key));
}
/**
 * 打开通知
 * @param {ITodoItem[]} 任务列表
 * @return
 */
function openNotification(notFinishedList) {
    // 设置body
    const body = notFinishedList.map(item => item.name).join(',');
    // 创建新通知
    const toast = new electron_1.Notification({
        title: '你的任务还没完成哦',
        // subtitle: '注意下自己的任务哦',
        body: `需要完成的任务：${body}`,
        closeButtonText: '确定',
        timeoutType: 'never'
    });
    // 通知显示
    toast.show();
}
/**
 * 获取时间范围
 * @param {ITodoItem[]} todos 任务列表
 */
function getDateRange(todos) {
    // 声明临时变量
    let startDate;
    let endDate;
    // 遍历任务
    todos.forEach(item => {
        // 获取时间段
        const { dateRange } = item;
        const [start, end] = dateRange;
        // 格式化
        const todoStartDate = new Date(start);
        const todoEndDate = new Date(end);
        // 判断是否在时间范围内，并替换值
        if (!startDate || startDate > todoStartDate) {
            startDate = todoStartDate;
        }
        if (!endDate || endDate < todoEndDate) {
            endDate = todoEndDate;
        }
    });
    // 返回时间段
    return [startDate, endDate];
}
/**
 * 检测任务
 */
function checkTodosAndNotification() {
    // 获取当前时间
    const date = new Date();
    // 获取当天记录
    const todoList = getTodayTodos(date);
    // 是否存在未完成数据
    const notFinishedList = getNotFinishedTodos(date, todoList);
    // 获取时间段
    const [start, end] = getDateRange(notFinishedList);
    // 获取当前小时数
    const hour = date.getHours();
    // 判断当前时间是否当下一次通知时间/超过时间/如果都完成了，则不处理
    if (hour !== nextToastHours || date < start || date > end || !notFinishedList.length) {
        console.log('当前时间不在下次通知时间内');
        // 判断时间是否在范围内
        if (hour > nextToastHours && hour !== 23) {
            nextToastHours = hour;
            console.log('重制时间');
        }
        else if (start && date > start && nextToastHours !== hour + 1) { // 如果时间不符合则重制
            nextToastHours = hour + 1;
        }
    }
    else {
        // 增加小时数量
        nextToastHours = hour + 1;
        // 判断小时是否到24
        if (nextToastHours === 24)
            nextToastHours = 0;
        // 打开通知
        openNotification(notFinishedList);
        console.log('打开通知');
    }
}
exports.checkTodosAndNotification = checkTodosAndNotification;
