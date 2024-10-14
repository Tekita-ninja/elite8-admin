<script setup lang="ts">
import { useUserStore } from '@/app/stores/useUserStore';
import type { Item, ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';

onMounted(() => initialData())

const common = useCommonStore()
const controller = useUserStore()

const options = ref<ServerOptions>(common.$state.params);
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

function handleChangeStatus(state: boolean, item: Item) {
  controller.update({ status: state }, item.id)
}
</script>
<template>
  <div>
    <EasyDataTable v-bind="{ ...TableProps }" v-model:server-options="options"
      v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data" :headers="columns"
      :loading="controller.loading" :items="controller.results.data">
    </EasyDataTable>
  </div>
</template>