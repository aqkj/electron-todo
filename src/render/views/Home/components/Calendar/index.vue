

<template>
  <!-- 日历 -->
  <el-calendar
    :key="nowDateTs"
    :model-value="value"
    @update:model-value="updateModelValue"
  >
    <template #dateCell="{ data: { type, isSelected, day, date } }">
      <div
        :key="day"
      >
        <!-- 完成图片 -->
        <img
          class="calendar__pic"
          :class="{
            'calendar__pic--show': type === 'current-month' && (getDateIsComplete(date) || (date < nowDate && hasTaskFail(date))),
            'calendar__pic--ok': type === 'current-month' && getDateIsComplete(date),
            'calendar__pic--out': type === 'current-month' && date < nowDate && hasTaskFail(date)
          }"
          :src="date < nowDate && hasTaskFail(date) ? outImg : okImg"
        />
        <!-- 标记 -->
        <el-badge
          is-dot
          :type="getDateBadgeType(date)"
          :hidden="type !== 'current-month' || !getDateColorsLength(date) || date < nowDate"
        >
          {{ day.slice(-2) }}
        </el-badge>
      </div>
    </template>
  </el-calendar>
</template>
<script lang="ts" setup>
import { Ref, ref, ComponentPublicInstance, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex'
import { key } from '../../../../store';
import { UPDATE_CURRENT_DATE, UPDATE_NOW_DATE } from '../../../../store/modules/app';
import dayjs from 'dayjs'
import { getTodosFromDate } from '../../../../../public/todos';
import okImg from '../../../../assets/ok.png'
import outImg from '../../../../assets/out.png'
// 获取store
const store = useStore(key)
const value = computed(() => store.state.app.currentDate)
/** 事项列表 */
const todoList = computed(() => store.state.app.todoList)
/** 完成数据 */
const completeDateMap = computed(() => store.state.app.completeDateMap)
/** 当前时间 */
const nowDate = computed(() => store.state.app.nowDate)
/** 当前时间戳 */
const nowDateTs = computed(() => nowDate.value.getTime())
let timer = null
onMounted(() => {
  timer && clearInterval(timer)
  timer = setInterval(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    // 判断当前时间和之前存储的时间是否相同
    if (date.getTime() !== nowDateTs.value) {
      updateNowDate(date)
    }
  }, 1000)
})
onUnmounted(() => {
  timer && clearInterval(timer)
  timer = null
})
/**
 * 获取对应日期下的颜色
 * @param {Date} date 日期
 */
function getDateColors(date: Date) {
  return getTodosFromDate(todoList.value, date).map(item => item.color || 'green')
}
/**
 * 获取当前时间是否都完成
 * @param {Date} date 日期
 */
function getDateIsComplete(date: Date) {
  // 获取格式化后的日期
  const dateStr = dayjs(date).format('YYYY-MM-DD')
  // 获取完成数量
  const completeNums = (completeDateMap.value[dateStr] || []).length
  // 判断
  return completeNums !== 0 && completeNums >= getDateColorsLength(date)
}
/**
 * 是否任务失败
 * @param {Date} date 日期
 */
function hasTaskFail(date: Date) {
  // 长度
  const nums = getTodosFromDate(todoList.value, date).length
  // 获取字符串
  const dateStr = dayjs(date).format('YYYY-MM-DD')
  // 获取完成数量
  const completeNums = (completeDateMap.value[dateStr] || []).length
  return nums > 0 && completeNums < nums
}
/**
 * 获取日期颜色数量
 * @param {Date} date 日期
 */
function getDateColorsLength(date: Date) {
  // 返回条数
  return getDateColors(date).length
}
/** 标签类型 */
type TbadgeType = 'danger' | 'primary' | 'success' | 'warning' | 'info'
// 类型数组
const typeArr: TbadgeType[] = ['danger', 'warning', 'primary', 'success', 'info']
/**
 * 获取时间标记类型
 * @param {Date} date 时间
 */
function getDateBadgeType(date: Date): TbadgeType {
  // 获取长度
  let length = getDateColorsLength(date)
  // 初始化
  length = length > 10 ? 10 : length
  // 获取值
  return typeArr[Math.abs(Math.round(length / 2) - 5)]
}
/**
 * 更新model值
 * @param {Date} val 时间
 */
function updateModelValue(val) {
  // commit
  store.commit(UPDATE_CURRENT_DATE, val)
}
/**
 * 更新当前时间
 * @param {Date} date 时间
 */
function updateNowDate(date) {
  // commit
  store.commit(UPDATE_NOW_DATE, date)
}
</script>
<style lang="less">
.calendar{
  // &--invalid{
  //   .el-badge{
  //     &__content{
  //       &--info{
  //         background-color: #353535;
  //       }
  //     }
  //   }
  // }
  &__pic{
    width: 20px;
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    transform: scale(1.5) rotate(-40deg);
    transform-origin: 0.5 0.5;
    transition:all .3s ease;
    &--show{
      opacity: .8;
      transform: scale(1) rotate(-40deg);
    }
    &--out{
      opacity: .8;
      transform: scale(1.8) rotate(-21deg);
      left: 3px;
      top: 3px;
    }
  }
}
.el-calendar-day{
  position: relative;
  .calendar__colors{
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    bottom: 0;
    span{
      width: 6px;
      height: 2px;
      border-radius: 3px;
      display: block;
      margin-top: 6px;
      margin-left: 6px;
    }
  }
  .el-badge{
    &__content{
      &.is-fixed{
        transform: translateY(-72%) translateX(130%);
        opacity: var(--calendar-opacity) !important;
      }
      &--info{
        background-color: #38caaf;
      }
    }
  }
}
</style>