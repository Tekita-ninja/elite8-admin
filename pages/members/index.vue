<script setup lang="ts">
import { useCustomerStore } from '@/app/stores/useCustomerStore';

const controller = useCustomerStore()
async function handleExport() {
  await controller.export()
}
</script>
<template>
  <ContainersPage title="members" subtitle="List of member">
    <template #actions>
      <div class="flex gap-2">
        <UiButton @click="handleExport" variant="outline" :disabled="controller.isExporting">
          <Icon name="file-icons:microsoft-excel" class="mr-2" /> Export
        </UiButton>
        <FeaturesCustomersDialogForm />
      </div>
    </template>
    <FeaturesCustomersTable />
  </ContainersPage>
</template>