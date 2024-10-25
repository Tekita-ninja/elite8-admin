<script setup lang="ts">
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import type { Item, ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';
import { useCustomerStore } from '@/app/stores/useCustomerStore';

onMounted(() => initialData())

const itemsSelected = ref<Item[]>([]);
const common = useCommonStore()
const controller = useWaitlistStore()
const customerController = useCustomerStore()
const options = ref<ServerOptions>(common.$state.params);
function initialData() {
  customerController.list()
  common.changeParams({
    ...common.$state.params,
    status:"WAITING"
  });
  controller.get(toQueryParams(common.$state.params))
}

function handleRemoveMultiple() {
  const ids = itemsSelected.value.map(i => i.id)
  controller.removeMultiple(ids)
  itemsSelected.value = []
}
watch(options, async (value) => {
  common.changeParams(value);
  initialData();
});
</script>
<template>
  <div>
    <div class="my-3" v-if="itemsSelected.length > 0">
      <div class="flex justify-end">
        <div class="text-destructive text-xs bg-destructive/10 p-2 mr-2 rounded-lg flex items-center font-semibold">
          By click Delete, Process will delete all data selected. the process cannot be cancelled!!!
        </div>
        <UiButton @click="handleRemoveMultiple" :disabled="controller.isRemoving" variant="destructive">
          Delete
        </UiButton>
      </div>
    </div>
    <EasyDataTable show-index v-bind="{...TableProps}" v-model:server-options="options"
      v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data"
      v-model:items-selected="itemsSelected" :headers="columns" :loading="controller.loading"
      :items="controller.results.data">
      <template #item-code="item">
        {{ queueCode(item.queueNumber,item.createdAt) }}
      </template>
      <template #item-actions="item">
        <div class="flex gap-1">
          <FeaturesWaitlistsDialogCall :item="item" />
          <FeaturesWaitlistsDialogPlay :item="item" />
          <FeaturesWaitlistsDialogRemove :item="item" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>