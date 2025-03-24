<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { ref } from "vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCustomerStore } from "@/app/stores/useCustomerStore";
const customerController = useCustomerStore()
await customerController.getVisitPerson({
  start: '2022-11-01',
  end: '2025-11-31'
})
const series = ref([
  {
    name: "Visitor",
    data: customerController.stats.daily.map((obj:any) => Object.values(obj)[0]),
  },
]);
const chartOptions = ref({
  chart: {
    type: "area",
    height: 300,
    toolbar: { show: false },
  },
  xaxis: {
    show: true,
    categories: customerController.stats.daily.map((obj: any) => Object.keys(obj)[0]),
    type:"category",
    labels: {
      show: true,
    }
  },
  yaxis: {
    show: true,
    labels: {
      show: true
    }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 3
  },
  colors: ["#0036FA"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [20, 100],
    },
  },
});
</script>
<template>
  <div class="w-full py-3 p-1">
    <div class="p-3 flex flex-col md:flex-row gap-2 items-center">
      <div class="flex gap-1">
        <Icon class="w-7 h-7" name="ic:twotone-query-stats" />
        <div>
          <h2 class="font-bold text-lg text-gray-800">Customer Visit</h2>
          <div class="flex text-xs text-gray-400">
            <p>Filter:</p>
            <p class="font-semibold"> Waiting List - Daily</p>
          </div>
        </div>
      </div>
      <div class="flex-1 flex justify-end px-2 gap-2">
        <Select>
          <SelectTrigger class="w-32">
            <SelectValue placeholder="Analytic Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Analytic Type</SelectLabel>
              <SelectItem value="PERSON">
                Waiting List
              </SelectItem>
              <SelectItem value="PAX">
                Total Pax
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger class="w-32">
            <SelectValue placeholder="Filter Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter Time</SelectLabel>
              <SelectItem value="D">
                Daily
              </SelectItem>
              <SelectItem value="W">
                Weekly
              </SelectItem>
              <SelectItem value="M">
                Monthly
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div class="px-2 md:px-4">
      <VueApexCharts type="area" height="320" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>