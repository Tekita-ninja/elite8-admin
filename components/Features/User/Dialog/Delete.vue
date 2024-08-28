<script setup lang="ts">
import { useUserStore } from '@/app/stores/useUserStore';
import type { Item } from 'vue3-easy-data-table';
defineProps<{ item: Item }>()
const controller = useUserStore()
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <UiButton size="icon-sm" variant="destructive">
        <Icon name="tabler:trash" />
      </UiButton>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          This action cannot be undone. This will permanently delete {{ item.name }} and remove your data from our servers.
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogAction @click="controller.delete(item.id)" class="bg-destructive">Continue</UiAlertDialogAction>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>