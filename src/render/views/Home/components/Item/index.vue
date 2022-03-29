<template>
  <div
    class="item"
    :class="{
      'item--complete': isComplete,
      'item--less': isLessNowDate
    }"
  >
    <span :style="`background:${data.color};`"></span>
    <div class="item__pic"><img src="../../../../assets/passed.png"/></div>
    <!-- 标题 -->
    <div class="item__content">
      <div class="item__name">{{ data.name }}</div>
      <div class="item__time">时间：[{{ time }}]</div>
    </div>
    <div
      class="item__btn"
      v-show="isInCurrentDate && menuList.length"
    >
      <!-- 点击按钮 -->
      <el-icon
        @click="onClickIcon"
      >
        <more-filled />
      </el-icon>
      <!-- <el-button
        type="success"
        :icon="More"
        size="small"
        circle
      /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  MoreFilled
} from '@element-plus/icons-vue'
import { computed } from 'vue';
import { useStore } from 'vuex'
import app, { COMPLETE_TASK, DELETE_TASK } from '../../../../store/modules/app';
import { ITodoItem } from '../../../../../public/types';
import dayjs from 'dayjs'
import { showMenu } from '../../../../utils/main/menu'
import { key } from '../../../../store';
import { ElMessage } from 'element-plus/es';
import { showNotify } from '../../../../utils/notification';
const { data } = defineProps<{
  data: ITodoItem
}>()
const store = useStore(key)
// 时间格式化
const time = computed(() => {
  const { time } = data
  const [startTime, endTime] = time
  const formatStr = 'HH:mm:ss'
  const startTimeStr = dayjs(startTime).format(formatStr)
  const endTimeStr = dayjs(endTime).format(formatStr)
  return `${startTimeStr} - ${endTimeStr}`
})
/**
 * 当前时间
 */
const currentDate = computed(() => store.state.app.currentDate)
/** 当前时间 */
const nowDate = computed(() => store.state.app.nowDate)
/**
 * 是否在当前时间内
 */
const isInCurrentDate = computed(() => dayjs(currentDate.value).format('YYYY-MM-DD') === dayjs(nowDate.value).format('YYYY-MM-DD'))
/**
 * 是否完成当前事项
 */
const isComplete = computed(() => {
  const dateStr = dayjs(currentDate.value).format('YYYY-MM-DD')
  const arr = store.state.app.completeDateMap[dateStr]
  const { key } = data
  return arr && arr.indexOf(key) !== -1
})
const menuList = computed(() => {
  // const arr = [{
  //   label: '编辑',
  //   value: 1
  // }, {
  //   label: '删除',
  //   value: 2
  // }]
  const arr = []
  if (!isComplete.value) {
    arr.unshift({
      label: '标记完成',
      value: 0
    })
  }
  return arr
})
/**
 * 是否小于当前时间
 */
const isLessNowDate = computed(() => nowDate.value > currentDate.value)
/**
 * 点击操作
 */
async function onClickIcon() {
  // 获取指令
  const command = await showMenu(menuList.value)
  console.log(command)
  const { key } = data
  // 判断类型为标记完成
  if (command === 0) {
    completeTask(dayjs(currentDate.value).format('YYYY-MM-DD'), key)
    // ElMessage.success('完成成功')
  } else if (command === 1) { // 判断指令是否为1
    // openNotification({
    //   title: data.tag,
    //   body: data.name
    // })
  } else if (command === 2) { // 判断指令是否为2，删除指令
    deleteTask(data.key)
    showNotify({
      title: '提示',
      body: '删除任务成功'
    })
  }
}
/**
 * 完成任务
 * @param {string} date 日期
 * @param {string} key 任务u唯一标识
 */
const completeTask = (date: string, key: string) => store.commit(COMPLETE_TASK, { date, key })
/**
 * 删除任务
 * @param {string} key 任务
 */
const deleteTask = (key: string) => store.commit(DELETE_TASK, key)
</script>
<style lang="less">
.item{
  display: flex;
  margin-top: 10px;
  color: #565656;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  &--complete{
    text-decoration: line-through;
    .item__pic{
      transform: scale(1);
      opacity: 1;
    }
    .item__content{
      padding-left: 50px;
    }
  }
  &--less{
    text-decoration: line-through;
  }
  &__pic{
    width: 40px;
    height: 40px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    transform: scale(1.8);
    transform-origin: 0.5 0.5;
    opacity: 0;
    transition: all .2s .1s ease;
    &>img{
      width: 70px;
      // position: absolute;
      // right: 0;
      // left: -14px;
      // top: -20px;
      // opacity: .4;
    }
  }
  &>span{
    width: 6px;
    height: 6px;
    position: absolute;
    display: block;
    border-radius: 50%;
    left: -16px;
    top: 10px;
  }
  &__content{
    padding-top: 3px;
    width: 90%;
    transition: all .2s ease;
  }
  &__name{
    line-height: 18px;
  }
  &__time{
    color: #777777;
    font-size: 12px;
    margin-top: 4px;
  }
  &__btn{
    margin-left: 10px;
    // display: none;
  }
}
</style>