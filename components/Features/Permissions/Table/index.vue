<script setup lang="ts">
import { usePermissionStore } from '@/app/stores/usePermissionStore';
import type { ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';

onMounted(() => initialData())

const common = useCommonStore()
const controller = usePermissionStore()
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
          <FeaturesPermissionsDialogDelete :item="item" />
          <FeaturesPermissionsDialogForm :item="item" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>