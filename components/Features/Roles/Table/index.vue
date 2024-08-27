<script setup lang="ts">
import { useRoleStore } from '@/app/stores/useRoleStore';
import { columns } from './colums';
import type { ServerOptions } from 'vue3-easy-data-table';

onMounted(() => initialData())

const common = useCommonStore()
const controller = useRoleStore()
const options = ref<ServerOptions>(common.$state.params);
function initialData() {
  common.changeParams(common.$state.params);
  controller.get(toQueryParams(common.$state.params))
}
watch(options, async (value) => {
  common.changeParams(value);
  initialData();
});
</script>
<template>
  <div>
    <EasyDataTable
      v-bind="{...TableProps}"
      v-model:server-options="options"
      v-model:server-items-length="controller.results.meta.total"
      v-if="controller.results.data"
      :headers="columns"
      :loading="controller.loading"
      :items="controller.results.data">
      <template #item-actions="item">
        <div class="flex gap-1">
          <FeaturesRolesDialogDelete :item="item" />
          <FeaturesRolesDialogForm :item="item" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>