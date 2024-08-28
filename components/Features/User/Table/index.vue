<script setup lang="ts">
import { useUserStore } from '@/app/stores/useUserStore';
import type { Item, ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';
import { Badge } from '@/components/ui/badge';
import { useRoleStore } from '@/app/stores/useRoleStore';

onMounted(() => initialData())

const common = useCommonStore()
const controller = useUserStore()
const roleController = useRoleStore()
const options = ref<ServerOptions>(common.$state.params);
function initialData() {
  roleController.get({ perPage: 10 })
  common.changeParams(common.$state.params);
  controller.get(toQueryParams(common.$state.params))
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
      <template #item-status="item">
        <UiSwitch @update:checked="(e) => handleChangeStatus(e, item)" :id="item.id" :checked="item.status" />
      </template>
      <template #item-actions="item">
        <div class="flex gap-1">
          <FeaturesUserDialogDelete :item="item" />
          <FeaturesUserDialogForm :item="item" />
          <FeaturesUserDialogAssignRole :item="item" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>