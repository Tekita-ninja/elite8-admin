<script setup lang="ts">
import { cn } from '@/lib/utils';

defineProps<{
  label: string
  icon?: string
  open?: boolean
  level?:number
  }>()
</script>
<template>
  <div :class="cn(
  'flex items-center gap-1 w-full text-start group  h-10 px-2',
  level === 2 && 'pl-9'
  )">
    <div v-if="icon" class="h-7 w-7 flex items-center justify-center">
      <Icon class="w-5 h-5" :name="icon" />
    </div>
    <span class="flex-1">{{ label }}</span>
    <Icon :class="cn(
      'transition-all duration-300',
      open ? 'rotate-90':''
    )" name="fluent:chevron-right-24-filled" />
  </div>
</template>