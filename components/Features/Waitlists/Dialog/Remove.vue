<script setup lang="ts">
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import type { Item } from 'vue3-easy-data-table';
defineProps<{ item: Item }>()
const controller = useWaitlistStore()
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <UiButton size="sm" variant="destructive">
        <Icon name="mdi:remove" class="mr-1" /> Remove
      </UiButton>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          This action cannot be undone. This will permanently delete {{ item.name }} and remove your data from our
          servers.
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogAction @click="controller.update({
          status: 'REMOVED'
        }, item.id)" class="bg-destructive">Continue</UiAlertDialogAction>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>