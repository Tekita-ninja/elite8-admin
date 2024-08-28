<template>
  <ContainersPage title="categories" subtitle="List of product categories">
    <template #actions>
      <UiButton>New</UiButton>
    </template>
    <div>
      CONTENT HERE...
      <input type="file" @input="handleUpload" />
    </div>
  </ContainersPage>
</template>

<script setup lang="ts">
import { useUploadStore } from '@/app/stores/useUploadStore';
const controller = useUploadStore()

async function handleUpload(e: any) {
  const responseImage = await controller.uploadImage(e.target.files[0])
  console.log({
    x: responseImage.images
    })
  }
</script>