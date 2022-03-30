<template>
  <div class="home">
    <!-- 主页 -->
    <!-- <transition name="el-fade-in"> -->
    <router-view />
    <!-- </transition> -->
    <!-- 底部组件 -->
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Footer from './components/Footer/index.vue'
// import Header from './components/Header/index.vue'
// import Main from './components/Main/index.vue'
// import Info from './components/Info/index.vue'
</script>
<style lang="less">
.home{
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  .el-calendar{
    --el-calendar-border: none;
    --el-calendar-cell-width: 45px;
    &__body{
      padding: 0;
    }
    &-table{
      border: 0;
      td, tr{
        border: 0;
      }
    }
    &-day{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>