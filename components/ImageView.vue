<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = defineProps<{
  src: string
  classThumb?: string
}>()
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <button :class="cn(
  classThumb ? classThumb : 'h-10 w-10',
        'border rounded overflow-hidden bg-slate-200 group'
      )">
        <img class="h-full w-full object-contain group-hover:scale-125 duration-300" :src="toLinkImageApi(src)" alt="404">
      </button>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-80 md:w-[400px]" side="right" :align="'end'">
      <img class="h-full w-full object-contain" :src="toLinkImageApi(src)" alt="404">
    </UiPopoverContent>
  </UiPopover>
</template>