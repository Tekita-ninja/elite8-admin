<script setup lang="ts">
import { useUserStore } from '@/app/stores/useUserStore';
import type { Item, ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';
import { useAuthStore } from '@/app/stores/useAuthStore';

onMounted(() => initialData())

const common = useCommonStore()
const controller = useUserStore()
const role = useAuthStore()

const options = ref<ServerOptions>(common.$state.params);
function initialData() {
  common.changeParams({
    ...common.$state.params,
    status: undefined
  });
  role.getOwnRole()
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
      <template #item-actions="item">
        <FeaturesUserDialogDelete v-if="role.role === 'SUPER'" :item="item" />
        <div v-else>
          <UiButton size="icon-sm" variant="destructive" disabled>
            <Icon name="tabler:trash" />
          </UiButton>
        </div>
      </template>
      <template #item-status="item">
        <div class="flex items-center space-x-2" v-if="role.role === 'SUPER'">
          <UiSwitch @update:checked="(e)=>handleChangeStatus(e,item)" :id="item.id" :checked="item.status" />
          <UiLabel class="cursor-pointer" :for="item.id">{{ item.status ? 'Active':'Inacive' }}</UiLabel>
        </div>
        <div class="flex items-center space-x-2" v-else>
          <UiSwitch disabled :id="item.id" :checked="item.status" />
          <UiLabel class="cursor-pointer" :for="item.id">{{ item.status ? 'Active':'Inacive' }}</UiLabel>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>