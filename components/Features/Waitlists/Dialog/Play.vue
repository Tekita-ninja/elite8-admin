<script setup lang="ts">
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import type { Item } from 'vue3-easy-data-table';
defineProps<{ item: Item }>()
const controller = useWaitlistStore()
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <UiButton size="sm" variant="default">
        <Icon name="solar:play-bold" class="mr-1" /> Play
      </UiButton>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          You will play the customer name <b>{{ item?.name }}</b>
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogAction @click="controller.play({
          queueId: item.id
        })" class="bg-destructive">Continue
        </UiAlertDialogAction>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>