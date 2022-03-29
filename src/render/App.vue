<script setup lang="ts">
// import { ElConfigProvider } from 'element-plus'
// import Layout from './components/Layout/index.vue'
import Header from './components/Header/index.vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useStore } from 'vuex'
import { key } from './store';
import { UPDATE_TODO_LIST, UPDATE_COMPLETE_DATE_MAP } from './store/modules/app';
import MainStore from './utils/main/store';
import { onMounted } from 'vue';
// 初始化数据
const store = useStore(key)
// store.commit(UPDATE_COMPLETE_DATE_MAP, {})
onMounted(async () => {
  // 获取todolist
  const todoListStr = await MainStore.get('todoList')
  const completeDateMapStr = await MainStore.get('completeDateMap')
  // console.log()
  // 转换
  const todoList = JSON.parse(todoListStr || '[]')
  const completeDateMap = JSON.parse(completeDateMapStr || '{}')
  // 更新
  store.commit(UPDATE_TODO_LIST, todoList)
  store.commit(UPDATE_COMPLETE_DATE_MAP, completeDateMap)
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <!-- 头部 -->
    <Header />
    <!-- <Layout /> -->
    <router-view/>
  </el-config-provider>
</template>

<style>
#app {
  height: 100%;
  /* background-color: #fff; */
  box-shadow: 0 0 10px 0;
}
</style>
