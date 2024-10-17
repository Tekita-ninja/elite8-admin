<script setup lang="ts">
import { messageWA } from '@/constants/message';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item: Item }>()
const dialog = ref(false)
const phone = ref('')
async function handleClickCall(type: string) {
  if (type === 'WHATSAPP') {
    window.open(`https://api.whatsapp.com/send?phone=${phone.value}&${messageWA(props.item.customer.name)}`, '_blank')
    dialog.value = false
  }
  if (type === 'CALL') {
    window.open(`tel:+${phone.value}`, '_blank')
    dialog.value = false
  }
}

function handleOpen() {
  phone.value = convertFormat(props.item.customer.phone)
}
</script>

<template>
  <UiDialog v-model:open="dialog" @update:open="handleOpen">
    <UiDialogTrigger as-child>
      <UiButton size="sm" variant="outline">
        <Icon name="line-md:phone-call-loop" class="mr-1" /> Call
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-sm">
      <UiDialogHeader>
        <UiDialogTitle>Choose a type of call</UiDialogTitle>
      </UiDialogHeader>
      <div>
        <div class="mb-4">
          <p>
            If you select one it will increase the number of calls. Calling <b>5</b> times will be
            considered removing from the queue
          </p>
        </div>
        <div class="space-y-3">
          <UiButton @click="handleClickCall('WHATSAPP')" class="w-full" variant="outline">
            <Icon class="w-6 h-6 mr-1" name="logos:whatsapp-icon" />
            Whatsapp
          </UiButton>
          <UiButton @click="handleClickCall('CALL')" class="w-full" variant="outline">
            <Icon class="w-5 h-5 mr-1" name="material-symbols:call" />
            Cellular Call
          </UiButton>
          <UiButton @click="dialog = false" class="w-full" variant="outline">
            Cancel
          </UiButton>
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>