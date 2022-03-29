
export enum ETODO_STATUS {
  PENDING = 0,
  COMPLETE = 1
}

/**
 * 日程item
 */
export interface ITodoItem {
  /** 唯一标识 */
  key: string
  /** 名称 */
  name: string
  /**
   * 标签
   */
  tag: string
  /**
   * 日期范围
   */
  dateRange: Date[]
  /**
   * 时间范围
   */
  time: Date[]
  /**
   * 周期
   */
  days: EDAY_TYPE[]
  /**
   * 描述
   */
  desc: string
  /**
   * 颜色
   */
  color: string
}
/**
 * 日期类型
 */
export enum EDAY_TYPE {
  /** 周日 */
  SUNDAY = 0,
  /** 周一 */
  MONDAY = 1,
  /** 周二 */
  TUESDAY = 2,
  /** 周三 */
  WEDNESDAY = 3,
  /** 周四 */
  THURSDAY = 4,
  /** 周五 */
  FRIDAY = 5,
  /** 周六 */
  SATURDAY = 6,
}
export const daysList = [{
  label: '周日',
  value: EDAY_TYPE.SUNDAY
}, {
  label: '周一',
  value: EDAY_TYPE.MONDAY
}, {
  label: '周二',
  value: EDAY_TYPE.TUESDAY
}, {
  label: '周三',
  value: EDAY_TYPE.WEDNESDAY
}, {
  label: '周四',
  value: EDAY_TYPE.THURSDAY
}, {
  label: '周五',
  value: EDAY_TYPE.FRIDAY
}, {
  label: '周六',
  value: EDAY_TYPE.SATURDAY
}]

/**
 * 完成数据
 */
export interface ICompleteDateMap {
  /** 时间：任务唯一标识数组 */
  [date: string]: string[]
}