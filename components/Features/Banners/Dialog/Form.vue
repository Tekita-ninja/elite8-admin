<script setup lang="ts">
import { useBannerStore } from '@/app/stores/useBannerStore';
import { toast } from 'vue-sonner';
const controller = useBannerStore()
const dialog = ref(false)
const files = ref<File[]>([])

function handleSubmit() {
  if (files.value.length < 1) {
    toast.error('Validation Error', {
      description:'Please choose file!'
    })
  } else {
    controller.create(files.value)
    dialog.value = false;
    files.value = []
  }
}

function changeFile(e:any) {
  const fileLists = e.target.files;
  files.value = fileLists;
}
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogTrigger as-child>
      <ButtonsCreate/>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Upload Images</UiDialogTitle>
      </UiDialogHeader>
      <div class="mt-5">
        <input type="file" multiple name="files" @change="changeFile" />
      </div>
      <div class="flex justify-end gap-2">
        <UiButton variant="outline">Cancel</UiButton>
        <UiButton @click="handleSubmit" :disabled="controller.isUploading" variant="default">Submit</UiButton>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>