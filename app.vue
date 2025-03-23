
<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>
<template>
  <div class="bg-blue-50">
    <Toaster richColors />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
