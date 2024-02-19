<script setup lang="ts">
import { ref } from 'vue'
import MetricsCards from './metrics-cards.vue'
import ChartReceipt from './chart-receipt.vue'
import ChartBestProducts from './chart-best-products.vue'
import { Loader2 } from 'lucide-vue-next'

const loading = ref(false)
</script>

<template>
  <div class="flex flex-col items-start justify-center px-8 p-6 gap-2">
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
      <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
    </div>
    <MetricsCards />

    <div class="grid grid-cols-9 gap-4 w-full">
      <ChartReceipt class="col-span-6" />
      <ChartBestProducts class="col-span-3" />
    </div>
  </div>
</template>
