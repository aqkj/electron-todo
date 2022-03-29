
import { Module } from 'vuex'
import { ICompleteDateMap, ITodoItem } from '../../../public/types'
import MainStore from '../../utils/main/store'
/** 更新弹窗显示 */
export const UPDATE_SHOW_INFO_DIALOG = 'updateShowInfoDialog'
/** 更新当前时间 */
export const UPDATE_CURRENT_DATE = 'updateCurrentDate'
/** 更新事项列表 */
export const UPDATE_TODO_LIST = 'updateTodoList'
/** 完成任务 */
export const COMPLETE_TASK = 'completeTask'
/** 删除任务 */
export const DELETE_TASK = 'deleteTask'
/** 更新完成日期数据 */
export const UPDATE_COMPLETE_DATE_MAP = 'updateCompleteDateMap'
/** 更新当前时间 */
export const UPDATE_NOW_DATE = 'updateNowDate'
/**
 * 完成单条数据
 */
// export interface ICompleteDateItem {
  
// }

/**
 * app状态
 */
export interface IAppState {
  /** 当前时间 */
  nowDate: Date
  /** 是否显示弹窗 */
  showInfoDialog: boolean
  /** 选中日期 */
  currentDate: Date
  /** 事项列表 */
  todoList: ITodoItem[]
  /** 日期完成状态 */
  completeDateMap: ICompleteDateMap
}
const nowDate = new Date()
nowDate.setHours(0, 0, 0, 0)
/**
 * 导出
 */
export default {
  state: {
    nowDate,
    showInfoDialog: false,
    currentDate: new Date(),
    todoList: [],
    completeDateMap: {}
  },
  mutations: {
    /**
     * 更新当前时间
     * @param state 状态
     * @param payload 时间
     */
    [UPDATE_NOW_DATE](state: IAppState, payload: Date) {
      state.nowDate = payload
    },
    /**
     * 更新显示弹窗
     * @param state 状态
     * @param payload 数据
     */
    [UPDATE_SHOW_INFO_DIALOG](state: IAppState, payload: boolean) {
      state.showInfoDialog = payload
    },
    /**
     * 更新当前选中时间
     * @param state 状态
     * @param payload 时间
     */
    [UPDATE_CURRENT_DATE](state: IAppState, payload: Date) {
      state.currentDate = payload
    },
    /**
     * 更新事项列表
     * @param state 状态
     * @param payload 列表
     */
    [UPDATE_TODO_LIST](state: IAppState, payload: ITodoItem[]) {
      state.todoList = payload
      MainStore.set('todoList', JSON.stringify(payload))
    },
    /**
     * 更新事项列表
     * @param state 状态
     * @param payload 列表
     */
    [UPDATE_COMPLETE_DATE_MAP](state: IAppState, payload: ICompleteDateMap) {
      state.completeDateMap = payload
      MainStore.set('completeDateMap', JSON.stringify(payload))
    },
    /**
     * 完成任务
     * @param state 状态
     * @param payload 数据
     */
    [COMPLETE_TASK](state: IAppState, payload: { date: string, key: string }) {
      const { date, key } = payload
      const arr = state.completeDateMap[date]
      if (arr) arr.push(key)
      else state.completeDateMap[date] = [key]
      MainStore.set('completeDateMap', JSON.stringify(state.completeDateMap))
    },
    /**
     * 删除任务
     * @param state 状态
     * @param key 任务key
     */
    [DELETE_TASK](state: IAppState, key: string) {
      // 查找位置
      const index = state.todoList.findIndex(todo => todo.key === key)
      /**
       * 判断是否存在
       */
      if (index !== -1) {
        state.todoList.splice(index, 1)
        MainStore.set('todoList', JSON.stringify(state.todoList))
      }
    }
  },
  actions: {
    /**
     * 更新新的操作
     * @param {object} ctx 上下文
     */
    async updateNewTodos({ commit }) {
      // 获取字符串
      const todoListStr = await MainStore.get('todoList')
      // 获取todo
      const todoList = JSON.parse(todoListStr || '[]') as ITodoItem[]
      // 更新
      commit(UPDATE_TODO_LIST, todoList)
    }
  },
  getters: {
    /**
     * 当前选中时间的事项
     * @param state 状态
     * @returns {ITodoItem[]} 过滤后的状态
     */
    currentDateTodoList(state) {
      const currentDate = state.currentDate
      return state.todoList.filter(item => {
        // 获取值
        const { dateRange } = item
        // 获取时间段
        const [startDate, endDate] = dateRange
        // 获取周几
        const week = currentDate.getDay()
        // 判断是否在有效时间范围内
        return new Date(startDate) < currentDate && new Date(endDate) > currentDate && item.days.includes(week)
      })
    }
  }
} as Module<IAppState, any>