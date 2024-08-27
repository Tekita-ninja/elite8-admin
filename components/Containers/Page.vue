<script setup lang="ts">
defineProps<{
    title: string
    subtitle?: string
  }>()
</script>
<template>
  <div class="bg-white p-3 my-2 rounded-xl">
    <header class="flex justify-between border-b pb-2 mb-1">
      <div class="flex-1">
        <h2 class="text-xl capitalize">{{ title }}</h2>
        <p class="text-sm text-slate-500">{{ subtitle }}</p>
      </div>
      <div class="flex-1 flex items-center justify-end flex-wrap">
        <slot name='actions' />
      </div>
    </header>
    <slot />
  </div>
</template>