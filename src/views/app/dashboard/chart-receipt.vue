<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { $dayjs } from '@/lib/day-js'
import { MetricsApi } from '@/services'
import { Loader2 } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import { useNotify } from '@/plugins/toast-notify'
import type { ChartConfiguration } from 'chart.js/auto'
import DataRangePicker from '@/components/data-range-picker.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const $notify = useNotify()

const chart = ref<Chart>()
const loading = ref(false)

const dataRange = ref({
  start: $dayjs().subtract(7, 'days'),
  end: $dayjs()
})

const config = ref<ChartConfiguration>({
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Monthly Receipts',
        data: [],
        fill: false,
        borderColor: 'rgb(148, 0, 255)',
        tension: 0.1,
        drawActiveElementsOnTop: false
      }
    ]
  },
  options: {
    locale: 'br-BR',
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            return new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(
              +value
            )
          }
        }
      }
    }
  }
})

const createChart = () => {
  const ctx = document.getElementById('chart-receipt')

  if (ctx) {
    chart.value?.destroy()
    chart.value = new Chart(ctx as HTMLCanvasElement, config.value)
  }
}

const getReceipts = async () => {
  loading.value = true
  const { data, error } = await MetricsApi.getDailyReceipt({
    from: dataRange.value.start.format(),
    to: dataRange.value.end.format()
  })
  loading.value = false

  if (error) return $notify.error('Erro ao carregar dados das receitas.')

  config.value.data.labels = data.map((item) => item.date)
  config.value.data.datasets[0].data = data.map((item) => item.receipt / 100)
}

watch(
  () => dataRange.value,
  async () => {
    await getReceipts()
    createChart()
  },
  { deep: true }
)

onMounted(async () => {
  await getReceipts()
  createChart()
})
</script>

<template>
  <Card class="rounded-md">
    <CardHeader>
      <CardTitle class="font-semibold text-md">
        <div class="flex justify-between items-center">
          <div class="space-y-1">
            <h3>Receita no Período</h3>
            <p class="text-sm text-muted-foreground font-normal">Receita diária no período</p>
          </div>

          <div class="flex items-center gap-2 text-sm">
            <span>Período</span>
            <DataRangePicker v-model="dataRange" />
          </div>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="h-full">
      <div class="flex justify-center items-center h-[50%]" v-if="loading">
        <Loader2 class="w-8 h-8 animate-spin" />
      </div>
      <div v-else class="flex justify-center items-center h-[35vh]">
        <canvas id="chart-receipt" responsive></canvas>
      </div>
    </CardContent>
  </Card>
</template>
