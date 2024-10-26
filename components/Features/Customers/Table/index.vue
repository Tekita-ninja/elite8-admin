<script setup lang="ts">
import { useCustomerStore } from '@/app/stores/useCustomerStore';
import type { Item, ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';
import { useProfileStore } from '@/app/stores/useProfileStore';

onMounted(() => initialData())

const common = useCommonStore()
const controller = useCustomerStore()
const profile = useProfileStore()
const options = ref<ServerOptions>(common.$state.params);
const itemsSelected = ref<Item[]>([]);
function initialData() {
  common.changeParams({
    ...common.$state.params,
    status: undefined
  });
  controller.get(toQueryParams({
    ...common.$state.params,
    status: undefined
  }))
}
watch(options, async (value) => {
  common.changeParams(value);
  initialData();
});
function handleDeleteMany() {
  const ids = itemsSelected.value.map(i => i.id)
  controller.deleteMany(ids)
  itemsSelected.value = []
}
</script>
<template>
  <div>
    <div class="my-3" v-if="itemsSelected.length > 0 && profile?.profile?.role === 'SUPER'">
      <div class="flex justify-end">
        <div class="text-destructive text-xs bg-destructive/10 p-2 mr-2 rounded-lg flex items-center font-semibold">
          By click Delete, Process will delete all data selected. the process cannot be cancelled!!!
        </div>
        <UiButton @click="handleDeleteMany" :disabled="controller.isDeleting" variant="destructive">
          Delete
        </UiButton>
      </div>
    </div>
    <template v-if="profile?.profile?.role === 'SUPER'">
      <EasyDataTable v-bind="{ ...TableProps }" v-model:server-options="options"
        v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data" :headers="columns"
        :loading="controller.loading" :items="controller.results.data" v-model:items-selected="itemsSelected">
        <template #item-phone="item">
          {{ maskPhoneNumber(item.phone) }}
        </template>
        <template #item-actions="item">
          <div class="flex gap-1">
            <FeaturesCustomersDialogDelete v-if="profile.profile?.role === 'SUPER'" :item="item" />
            <FeaturesCustomersDialogForm :item="item" />
          </div>
        </template>
      </EasyDataTable>
    </template>
    <template v-if="profile?.profile?.role === 'ADMIN'">
      <EasyDataTable v-bind="{ ...TableProps }" v-model:server-options="options"
        v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data" :headers="columns"
        :loading="controller.loading" :items="controller.results.data">
        <template #item-phone="item">
          {{ maskPhoneNumber(item.phone) }}
        </template>
        <template #item-actions="item">
          <div class="flex gap-1">
            <FeaturesCustomersDialogForm :item="item" />
          </div>
        </template>
      </EasyDataTable>
    </template>
  </div>
</template>