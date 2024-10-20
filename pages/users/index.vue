<script setup lang="ts">
import { useAuthStore } from '@/app/stores/useAuthStore';

const role = useAuthStore()
</script>
<template>
  <ContainersPage title="users" subtitle="List of users">
    <template #actions>
      <FeaturesUserDialogForm v-if="role.role === 'SUPER'" />
    </template>
    <FeaturesUserTable />
  </ContainersPage>
</template>