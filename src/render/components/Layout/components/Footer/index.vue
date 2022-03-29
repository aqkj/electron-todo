<template>
  <div class="footer">
    <!-- 图标 -->
    <el-icon @click="onAddClick"><Plus /></el-icon>
    <div class="footer__todonums">任务总数：{{ currentDateTodoList.length }}
      <el-icon
        :class="{
          'footer__loading': loading
        }"
        @click="update"
      ><RefreshRight /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Plus, RefreshRight } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../../../../store';
import { UPDATE_SHOW_INFO_DIALOG } from '../../../../store/modules/app';
import { showAddMenu, showMenu } from '../../../../utils/main/menu'
import { showManageWindow } from '../../../../utils/main/window';
const router = useRouter()
const store = useStore(key)
/** 当前时间事项列表 */
const currentDateTodoList = computed(() => store.getters.currentDateTodoList)
/**
 * 添加点击
 */
async function onAddClick() {
  try{
    const data = await showMenu([{
      label: '管理日程',
      value: 0
    }])
    /**
     * 判断点击的是否为管理日程
     */
    if (data === 0) {
      // router.push({
      //   name: 'Info'
      // })
      showManageWindow()
    }
    // updateShowInfoDialog(true)
    console.log('返回结果', data)
  } catch(e) {
    console.log('错误', e)
  }
}
const loading = ref(false)
let timer = null
/**
 * 更新任务
 */
function update() {
  if (loading.value) return
  loading.value = true
  updateNewTodos()
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    loading.value = false
  }, 1000)
}
/**
 * 更新弹窗
 */
const updateNewTodos = () => store.dispatch('updateNewTodos')
</script>
<style lang="less">
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;
    padding: 0 8px;
    box-sizing: border-box;
    .el-icon{
      font-size: 20px;
      cursor: pointer;
      color: #4a4a4a;
    }
    &__todonums{
      font-size: 12px;
      color: #a0a0a0;
      font-weight: bold;
      margin-left: auto;
      display: flex;
      align-items: center;
      .el-icon{
        color: #696969;
        font-size: 16px;
        margin-left: 6px;
      }
    }
    &__loading{
      animation: rotate .5s linear infinite;
      color: var(--el-color-primary);
    }
  }
  @keyframes rotate {
    100%{
      transform: rotate(360deg);
    }
  }
</style>