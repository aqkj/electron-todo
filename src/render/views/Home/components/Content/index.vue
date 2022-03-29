<template>
  <div class="content" :key="currentDate.getTime()">
    <!-- 内容 -->
    <!-- <transition-group name="el-fade-in"> -->
    <!-- 数据 -->
    <Data v-if="selectedDayTodos.length" :data="selectedDayTodos"/>
    <!-- 空 -->
    <el-empty
      v-else
      :image-size="80"
      description="暂无日程"
    />
    <!-- </transition-group> -->
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex'
import { key } from '../../../../store';
import { ITodoItem } from '../../../../../public/types';
import Data from '../Data/index.vue'
// import dayjs from 'dayjs'
/**
 * 数据item
 */
export interface IDataItem {
  tag: string,
  children: ITodoItem[]
}

let data = ref<IDataItem[]>([])
const store = useStore(key)
const currentDate = computed(() => store.state.app.currentDate)
/** 事项列表 */
const currentDateTodoList = computed(() => store.getters.currentDateTodoList)
// watch(() => currentDate.value, (newVal, oldVal) => {
//   genToDayTodos()
// }, {
//   immediate: true
// })

// onMounted(async () => {
//   genToDayTodos()
// })
/**
 * 获取当天事项并分组
 */
const selectedDayTodos = computed(() => {
  const group: IDataItem[] = []
  // 遍历过滤
  currentDateTodoList.value.forEach(todo => {
    // 获取tag
    const { tag } = todo
    // 获取item
    const item = group.find(item => item.tag === tag)
    // 存在则插入
    if (item) {
      item.children.push(todo)
    } else {
      // 插入
      group.push({
        tag,
        children: [todo]
      })
    }
  })
  return group
})

</script>
<style lang="less">
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.content{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e1e1e1;
  padding-bottom: 40px;
  box-sizing: border-box;
  overflow: scroll;
  height: 0;
  // background-color: #ddd;
  position: relative;
  .el-empty{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
}
</style>