<script setup lang="ts">
import { useMenuStore } from '@/app/stores/useMenuStore';
import { cn } from '@/lib/utils';
const stateMenu = useMenuStore();
defineProps<{
  label: string
  icon?: string
  href: string
  level?:number
}>()
</script>
<template>
  <NuxtLink @click="stateMenu.closeMenu()" :href="href" activeClass="activeClassMenu" :class="cn(
  'flex items-center gap-1 w-full text-start group  h-10 px-2',
      level === 2 && 'pl-9',
      level === 3 && 'pl-9',
    )">
    <div v-if="icon" class="iconWrapper h-7 w-7 flex items-center justify-center">
      <Icon class="w-5 h-5" :name="icon" />
    </div>
    <span class="flex-1">{{ label }}</span>
  </NuxtLink>
</template>