<template>
  <div class="flex-1 flex flex-col p-2 gap-4 overflow-auto">
    <div class="flex flex-col gap-4 sm:flex-row">
      <Card class="p-4 flex-1 ">
        <template #header>
          <span class="block text-center text-2xl p-4 pb-0">Users</span>
        </template>
        <template #content>
          <span class="block text-center text-5xl p-4 font-bold">{{ userCount }}</span>
        </template>
        <template #footer>
          <div class="mt-4">
            <RouterLink to="/users">
              <Button label="View Users" fluid outlined class="p-button-primary"></Button>
            </RouterLink>
          </div>
        </template>
      </Card>
      <Card class="p-4 flex-1">
        <template #header>
          <span class="block text-center text-2xl p-4 pb-0">Artists</span>
        </template>
        <template #content>
          <span class="block text-center text-5xl p-4 font-bold">{{ artistCount }}</span>
        </template>
        <template #footer>
          <div class="mt-4">
            <RouterLink to="/artists">
              <Button label="View Artists" fluid outlined class="p-button-primary"></Button>
            </RouterLink>
          </div>
        </template>
      </Card>
      <Card class="p-4 flex-1 ">
        <template #header>
          <span class="block text-center text-2xl p-4 pb-0">Musics</span>
        </template>
        <template #content>
          <span class="block text-center text-5xl p-4 font-bold">{{ musicCount }}</span>
        </template>
        <template #footer>
          <div class="mt-4">
            <RouterLink to="/musics">
              <Button label="View Musics" fluid outlined class="p-button-primary"></Button>
            </RouterLink>
          </div>
        </template>
      </Card>
    </div>
    <Card class="p-4 flex-1" pt:body:class="flex-1 " pt:content:class="flex-1">
      <template #header>
        <div class="flex flex-col justify-between gap-4 sm:flex-row">
          <span class="text-2xl font-semibold">Count History</span>
          <SelectButton v-model="historyDays" :options="historyOptions" option-label="label" option-value="value" size="small"/>
        </div>
      </template>
      <template #content>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full !min-h-80" />
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import DashboardService from "@/services/DashboardService";
import { Button, Card, SelectButton } from "primevue";
import Chart from "primevue/chart";
import { ref, onMounted, watch } from "vue";
import { RouterLink } from "vue-router";

onMounted(() => {
  setData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
const userCount = ref(0)
const artistCount = ref(0)
const musicCount = ref(0)
const historyDays = ref(7)
const historyOptions = [
  {label: "Last month", value: 30},
  {label: "Last week", value: 7}

]

watch(historyDays, (oldVal, newVal) => {
  console.log(newVal, oldVal)
  if(newVal && oldVal && oldVal != newVal)
  setData()
})

const setData = async () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const dashboardData = await (new DashboardService()).getData(historyDays.value);
  userCount.value = dashboardData.count.users;
  artistCount.value = dashboardData.count.artists;
  musicCount.value = dashboardData.count.musics;
  chartData.value = {
    labels: dashboardData.daily_count.map(d => d.date),
    datasets: [
      {
        label: 'Users',
        backgroundColor: documentStyle.getPropertyValue('--p-gray-200'),
        borderColor: documentStyle.getPropertyValue('--p-gray-200'),
        data: dashboardData.daily_count.map(d => d.users)
      },
      {
        label: 'Artists',
        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        data: dashboardData.daily_count.map(d => d.artists)
      },
      {
        label: 'Musics',
        backgroundColor: documentStyle.getPropertyValue('--p-gray-700'),
        borderColor: documentStyle.getPropertyValue('--p-gray-700'),
        data: dashboardData.daily_count.map(d => d.musics)
      }
    ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        type: 'logarithmic',
        ticks: {
          color: textColor
        },
        grid: {
          display: false,
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };
}
</script>
