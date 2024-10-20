<script setup lang="ts">
import { useUtilityStore } from '@/app/stores/useUtilityStore';

const controller = useUtilityStore()
onMounted(() => initialData())
function initialData() {
  controller.getSummary()
}
</script>

<template>
  <div v-for="items in controller.summary" :key="items.title" class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    <NuxtLink :href="`/${item.path}`" v-for="(item,index) in items.data" :key="index" class="p-4 rounded-xl bg-white flex items-center shadow">
      <div class="flex-1">
        <h2 class="text-xl md:text-3xl font-bold">{{ item.count }}</h2>
        <p class="text-xs">{{ item.label }}</p>
      </div>
    </NuxtLink>
  </div>
</template>