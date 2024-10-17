<script setup lang="ts">
import { useWaitlistStore } from '@/app/stores/useWaitlistStore';
import type { ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';
import { useCustomerStore } from '@/app/stores/useCustomerStore';

onMounted(() => initialData())

const common = useCommonStore()
const controller = useWaitlistStore()
const customerController = useCustomerStore()
const options = ref<ServerOptions>(common.$state.params);
function initialData() {
  controller.getLastNum()
  customerController.list()
  common.changeParams({
    ...common.$state.params,
    status:"REMOVED"
  });
  controller.get(toQueryParams(common.$state.params))
}
watch(options, async (value) => {
  common.changeParams(value);
  initialData();
});
</script>
<template>
  <div>
    <EasyDataTable v-bind="{...TableProps}" v-model:server-options="options"
      v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data" :headers="columns"
      :loading="controller.loading" :items="controller.results.data">
      <template #item-code="item">
        {{ queueCode(item.queueNumber, item.createdAt) }}
      </template>
      <template #item-actions="item">
        <div class="flex gap-1">
          <FeaturesRemovedDialogPutBack :item="item" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>