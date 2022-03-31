

<template>
  <div class="data">
    <Group
      v-for="group in props.data"
      :key="group.tag"
      :label="group.tag"
    >
      <Item
        v-for="(item, index) in group.children"
        :key="index"
        :data="item"
      />
    </Group>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { type IDataItem } from '../Content/index.vue'
import Group from '../Group/index.vue'
import Item from '../Item/index.vue'
interface IProps{
  data: IDataItem[]
}
const props = defineProps<IProps>()
</script>
<style lang="less">
.data{
}
</style>