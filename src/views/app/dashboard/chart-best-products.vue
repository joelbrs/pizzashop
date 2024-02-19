<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MetricsApi } from '@/services'
import { useNotify } from '@/plugins/toast-notify'
import { BarChart, Loader2 } from 'lucide-vue-next'
import { type ChartConfiguration, Chart } from 'chart.js/auto'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const $notify = useNotify()

const chart = ref<Chart>()
const loading = ref(false)

const config = ref<ChartConfiguration>({
  type: 'doughnut',
  data: {
    datasets: [
      {
        label: 'Monthly Receipts',
        data: [],
        hoverOffset: 10,
        backgroundColor: ['#f59e0b', '#0ea5e9', '#f43f5e', '#10b981', '#8b5cf6'],
        cutout: 85,
        spacing: 20,
        borderWidth: 0,
        radius: 75
      }
    ]
  }
})

const createChart = () => {
  const ctx = document.getElementById('chart-best-products')

  if (ctx) {
    chart.value?.destroy()
    chart.value = new Chart(ctx as HTMLCanvasElement, config.value)
  }
}

const getProducts = async () => {
  const { data, error } = await MetricsApi.getPopularProducts()

  if (error) return $notify.error('Erro ao carregar os dados dos melhores produtos.')

  // config.value.data.labels = data.map((item) => item.product)
  config.value.data.datasets[0].data = data.map((item) => item.amount)
}

onMounted(async () => {
  await getProducts()
  createChart()
})
</script>

<template>
  <Card class="rounded-md w-full h-full">
    <CardHeader>
      <CardTitle class="font-semibold text-md">
        <div class="flex justify-between items-center">
          <h3>Produtos Populares</h3>

          <BarChart class="w-4 h-4 text-muted-foreground" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="h-full">
      <div class="flex justify-center items-center h-[70%]" v-if="loading">
        <Loader2 class="w-8 h-8 animate-spin" />
      </div>
      <div v-else class="flex justify-center items-center h-[35vh]">
        <canvas id="chart-best-products"></canvas>
      </div>
    </CardContent>
  </Card>
</template>
