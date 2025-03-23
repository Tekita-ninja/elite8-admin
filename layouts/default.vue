<script setup lang="ts">
import { useProfileStore } from '@/app/stores/useProfileStore';

const profile = useProfileStore()
profile.getMyProfile()
</script>
<template>
  <div class="flex h-screen items-start max-w-screen-2xl mx-auto">
    <Sidebar />
    <div class="w-full h-screen flex-1 overflow-auto">
      <Navbar />
      <main class="p-3">
        <slot />
      </main>
    </div>
  </div>
</template>