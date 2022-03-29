// 任务

import { ITodoItem } from "./types"


/**
 * 通过时间获取任务
 * @param todoList 任务列表
 * @param date 时间
 * @returns {ITodoItem[]} 返回对应时间的任务
 */
export function getTodosFromDate(todoList: ITodoItem[], date: Date) {
  return todoList.filter(todo => {
    const [startDate, endDate] = todo.dateRange
    const week = date.getDay()
    return new Date(startDate) < date && new Date(endDate) > date && todo.days.includes(week)
  })
}