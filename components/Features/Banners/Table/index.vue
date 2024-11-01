<script setup lang="ts">
import { useBannerStore } from '@/app/stores/useBannerStore';
import type { ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';

onMounted(() => initialData())

const common = useCommonStore()
const controller = useBannerStore()
const options = ref<ServerOptions>(common.$state.params);
function initialData() {
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
      <template #item-image="item">
        <ImageView :src="item.filename" class-thumb="w-12 h-12" />
      </template>
      <template #item-actions="item">
        <FeaturesBannersDialogDelete :item="item" />
      </template>
    </EasyDataTable>
  </div>
</template>