<template>
  <div class="group">
    <!-- 标题 -->
    <div class="group__title">
      <el-icon><List /></el-icon>{{ props.label }}
    </div>
    <!-- 内容 -->
    <div class="group__content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { List } from '@element-plus/icons-vue'
const props = defineProps<{
  label: string
}>()
</script>
<style lang="less">
.group{
  display: block;
  width: 100%;
  padding:0 16px;
  margin-top: 10px;
  box-sizing: border-box;
  &:last-child{
    padding-bottom: 10px;
  }
  &__title{
    font-size: 16px;
    color: #305c71;
    font-weight: bold;
    display: flex;
    align-items: center;
    .el-icon{
      font-size: 16px;
      margin-left: -4px;
      margin-right: 4px;
    }
  }
  &__content{
    padding: 0 10px 0 16px;
  }
}
</style>