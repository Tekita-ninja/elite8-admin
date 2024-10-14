<script setup lang="ts">
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item: Item }>()
const controller = useWaitlistStore()

function handleClickSave() {
  controller.update({ status: "COMPLETE" }, props.item.id)
}
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <UiButton size="sm" variant="default">
        <Icon name="fa6-solid:check" class="mr-1" /> Mark as done
      </UiButton>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          you will mark that the player has finished.
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
        <UiAlertDialogAction @click="handleClickSave">
          <Icon name="fa6-solid:check" class="mr-1" /> Save
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>