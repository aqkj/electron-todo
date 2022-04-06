
<template>
  <!-- 头部 -->
  <el-page-header :icon="ArrowLeft" content="新建事项" @back="cancel"/>
  <!-- <el-dialog
    :model-value="showDialog"
    title="添加日程"
    width="90%"
    center
  > -->
    <!-- 表单 -->
    <el-form ref="formEl" class="info-form" :rules="rule" :model="form" label-width="80px">
      <el-form-item label="事项名" prop="name">
        <el-input v-model="form.name" placeholder="请输入事项名" />
      </el-form-item>
      <el-form-item label="执行日期" prop="dateRange">
        <el-date-picker
          v-model="form.dateRange"
          :disabled-date="onDisabledDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="指定周期" prop="days">
        <el-checkbox-group v-model="form.days">
          <el-checkbox
            v-for="day in daysList"
            :key="day.value"
            :label="day.value"
          >{{ day.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="开始时间" prop="time">
        <el-time-picker
          v-model="form.time"
          is-range
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-input v-model="form.tag" placeholder="请输入日程标签" />
      </el-form-item>
      <el-form-item label="色标" prop="color">
        <el-color-picker v-model="form.color" :predefine="predefineColors" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ isEdit ? '保存' : '创建' }}事项</el-button>
        <el-button @click="cancel">取消</el-button>
        <!-- <el-button @click="clear">清空事项</el-button> -->
      </el-form-item>
    </el-form>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template> -->
  <!-- </el-dialog> -->
</template>
<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../../store'
import { UPDATE_SHOW_INFO_DIALOG, UPDATE_TODO_LIST, UPDATE_TASK } from '../../store/modules/app';
import MainStore from '../../utils/main/store'
import { randomKey } from '../../utils/math';
import { ITodoItem, daysList } from '../../../public/types'
import { ElFormContext, ElMessage } from 'element-plus/es';
// 预选色
const predefineColors = [
  '#c45656',
  '#f56c6c',
  '#f89898',
  '#fab6b6',
  '#fcd3d3',
  '#f0f',
  '#00f',
  '#3a8ee6',
  '#409eff',
  '#0ff',
  '#ff0',
  '#909399',

  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#000000',
]
// 获取router
const router = useRouter()
const route = useRoute()
const store = useStore(key)
// 当前时间
const currentDate = computed(() => store.state.app.currentDate)
// 存在id则为编辑
const isEdit = computed(() => !!route.query.key)
// 默认时间范围
const defaultDateRange = computed(() => {
  const start = new Date(currentDate.value)
  start.setHours(0, 0, 0, 0)
  const end = new Date(currentDate.value)
  end.setHours(23, 59, 59, 999)
  return [start, end]
})
/**
 * 表单
 */
const form = reactive<ITodoItem>({
  key: '',
  name: '',
  desc: '',
  tag: '',
  days: [0, 1, 2, 3, 4, 5, 6],
  dateRange: defaultDateRange.value,
  color: '',
  time: [new Date('2000-01-01 09:30:00'), new Date('2000-01-01 20:30:00')]
})
const formEl = ref<ElFormContext>()
const rule = {
  name: [
    { required: true, message: '请输入事项名称', trigger: 'blur' }
  ],
  tag: [
    { required: true, message: '请输入标签名称', trigger: 'blur' }
  ],
  color: [
    { required: true, message: '请选择标签颜色', trigger: 'blur' }
  ],
  time: [
    { required: true, message: '请输入时间范围', trigger: 'blur' }
  ]
}
// 获取todolist
const todoList = computed(() => store.state.app.todoList)
// 监控是否
watch(() => isEdit.value, newVal => {
  if (newVal) {
    getDetail()
  }
}, {
  immediate: true
})
/**
 * 提交
 */
const onSubmit = async () => {
  console.log('submit!')
  console.log(form)
  form.key = form.key || randomKey()
  if (form.dateRange[0] instanceof Date) {
    form.dateRange[0].setHours(0, 0, 0, 0)
    form.dateRange[1].setHours(23, 59, 59, 999)
  }
  // 是否是编辑
  if (isEdit.value) {
    // 更新任务
    updateTodo(form)
    ElMessage.success('任务修改成功')
  } else {
    // 获取列表
    const list = todoList.value.slice()
    // 插入
    list.push(form)
    // 更新
    updateTodoList(list)
    ElMessage.success('添加任务成功')
  }
  cancel()
}
function clear() {
  updateTodoList([])
}
/**
 * 获取详情
 */
function getDetail() {
  const { key } = route.query
  // 获取对应数据
  const item = todoList.value.find(todo => todo.key === key)
  // 判断是否存在
  if (item) {
    // 遍历赋值
    for (const key in item) {
      form[key] = item[key]
    }
  }
}
/**
 * 更新事项列表
 * @param {ITodoItem[]} list 列表
 */
const updateTodoList = (list: ITodoItem[]) => store.commit(UPDATE_TODO_LIST, list)
/**
 * 更新事项
 * @param {ITodoItem} item 列表
 */
const updateTodo = (item: ITodoItem) => store.commit(UPDATE_TASK, item)
/**
 * 取消
 */
function cancel() {
  router.go(-1)
  // updateShowInfoDialog(false)
}
const nowDate = new Date()
nowDate.setHours(0, 0, 0, 0)
/**
 * 禁用时间
 * @param {Date} date 时间
 */
function onDisabledDate(date: Date) {
  return date < nowDate
}
</script>
<style lang="less">
.info-form{
  padding-right: 10px;
  padding-top: 20px;
  &__todos{
    &__title{
      margin-bottom: 10px;
    }
  }
}
</style>