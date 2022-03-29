<template>
  <div class="manage">
    <!-- 标题 -->
    <div class="manage__header">
      <div class="manage__title">任务总数：{{ todoList.length }}</div>
      <el-button type="primary" @click="add">添加日程</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="todoList"
      style="width: 100%"
      border
      max-height="400"
    >
      <el-table-column prop="name" label="事项名称" width="220"/>
      <el-table-column prop="tag" label="标签" width="120" />
      <el-table-column prop="color" label="颜色" width="60" align="center">
        <template #default="scope">
          <div class="manage__color" :style="`background-color:${scope.row.color};`"></div>
        </template>
      </el-table-column>
      <el-table-column prop="days" label="周期" width="120" />
      <el-table-column prop="dateRange" label="执行日期段" width="220">
        <template #default="scope">
          {{ dayjs(scope.row.dateRange[0]).format('YYYY-MM-DD') }} ~ 
          {{ dayjs(scope.row.dateRange[1]).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间段" width="160">
        <template #default="scope">
          {{ dayjs(scope.row.time[0]).format('HH:mm:ss') }} ~ 
          {{ dayjs(scope.row.time[1]).format('HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="del(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { key } from '../../store';
import { DELETE_TASK } from '../../store/modules/app';
import { ElMessage, ElMessageBox } from 'element-plus/es';
import { ITodoItem } from '../../../public/types';
// 状态
const store = useStore(key)
const router = useRouter()
// 日程列表
const todoList = computed(() => store.state.app.todoList)
/**
 * 删除
 * @param {ITodoItem} todo 任务
 */
function del(todo: ITodoItem) {
  ElMessageBox.confirm(
    `此操作将删除此任务[${todo.name}]，是否确定删除?`,
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    deleteTask(todo.key)
    ElMessage.success('删除成功')
  })
}
/**
 * 添加任务
 */
function add() {
  router.push({
    name: 'Info'
  })
}
/**
 * 删除任务
 * @param {string} key 任务
 */
const deleteTask = (key: string) => store.commit(DELETE_TASK, key)
</script>
<style lang="less">
.manage{
  padding: 20px;
  user-select: text;
  &__color{
    width: 20px;
    height: 20px;
    border-radius: 6px;
    margin: 0 auto;
  }
  &__header{
    padding: 10px 0;
    color: #4a4a4a;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>