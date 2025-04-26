<script setup lang="ts">
import { useCustomerStore } from '@/app/stores/useCustomerStore';
import { useUtilityStore } from '@/app/stores/useUtilityStore';

const controller = useUtilityStore()
const customerController = useCustomerStore()
await controller.getSummary()
await customerController.getTop({
  count: 5
})
onMounted(() => initialData())
async function initialData() {
}
const mergedData = controller.summary.flatMap(section => section.data)
const items = mergedData.filter(i => i.label !== "Users")

</script>

<template>
  <div class="mt-4">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <NuxtLink :href="`/${item.path}`" v-for="(item, index) in items" :key="index"
        class="p-4 md:p-5 rounded-xl bg-white overflow-hidden relative flex items-center shadow">
        <div class="flex w-full">
          <div class="flex-1">
            <p class="text-xs uppercase text-black/60">{{ item.label }}</p>
            <h2 class="text-xl md:text-3xl font-bold">{{ item.count }}</h2>
          </div>
          <div class="flex items-start justify-center text-main">
            <Icon v-if="item.label === 'Customers'" class="w-8 h-8" name="ri:user-add-fill" />
            <Icon v-if="item.label === 'Waiting'" class="w-8 h-8" name="ri:list-ordered" />
            <Icon v-if="item.label === 'Removed'" class="w-8 h-8" name="mdi:times" />
            <Icon v-if="item.label === 'Done'" class="w-8 h-8" name="mdi:checks" />
          </div>
        </div>
        <div class="absolute h-1 bg-main/90 w-full left-0 right-0 bottom-0"></div>
      </NuxtLink>
    </div>
    <div class="mt-4 md:mt-8">
      <div>
        <h2 class="text-xl md:text-2xl text-main/90 font-extrabold capitalize">Customers Analytics</h2>
        <p class="text-black/60 text-sm">Weekly / Monthly Customers Insight</p>
      </div>
      <div class="mt-4 grid md:grid-cols-3 gap-4">
        <div class="md:col-span-2 rounded-xl bg-white overflow-hidden relative flex items-center shadow">
          <FeaturesDashboardChartCustomer />
        </div>
        <div class="md:col-span-1 p-4 md:p-6 rounded-xl bg-white overflow-hidden shadow">
          <div>
            <div class="flex gap-2 items-center pb-4">
              <Icon name="ic:outline-leaderboard" class="w-7 h-7" />
              <h2 class="font-bold text-lg text-gray-800">TOP 5 CUSTOMER / MONTH</h2>
            </div>
            <div>
              <div class="flex py-3" v-for="(item, index) in customerController.tops" :key="item.id">
                <div class="w-5">{{ index + 1 }}.</div>
                <div class="flex-1">
                  <h3 class="font-semibold line-clamp-1">
                    {{ item.name }}
                  </h3>
                  <div class="flex gap-1 items-center">
                    <Icon name="ic:outline-phone-in-talk" />
                    <p class="text-sm">{{ item.phone }}</p>
                  </div>
                </div>
                <div class="w-20 text-end">{{ item.countVisit }} Visit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>