<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MetricsApi } from '@/services'
import { useNotify } from '@/plugins/toast-notify'
import { DollarSign, Utensils } from 'lucide-vue-next'
import type { MonthAmounts, MonthReceipt, DayAmounts } from '@/@types'
import MetricsCardsSkeleton from './metrics-cards-skeleton.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const $notify = useNotify()

const loading = ref(false)

const items = ref({
  receipt: {} as MonthReceipt,
  monthOrders: {} as MonthAmounts,
  dayOrders: {} as DayAmounts,
  canceledOrders: {} as MonthAmounts
})

const setDiffField = (value: number, canceled = false) => {
  if ((!canceled && value >= 0) || (canceled && value <= 0)) {
    return { color: 'text-green-400', value: `+${value}%` }
  }
  return { color: 'text-red-400', value: `${value}%` }
}

const getMonthReceipts = async () => {
  const { data, error } = await MetricsApi.getMonthReceipt()

  if (error) return $notify.error('Erro ao carregar receita.')

  items.value.receipt = data
}

const getMonthOrders = async () => {
  const { data, error } = await MetricsApi.getOrdersAmount()

  if (error) return $notify.error('Erro ao carregar pedidos (mês).')

  items.value.monthOrders = data
}

const getDayOrders = async () => {
  const { data, error } = await MetricsApi.getDayOrdersAmount()

  if (error) return $notify.error('Erro ao carregar pedidos (dia).')

  items.value.dayOrders = data
}

const getCanceledOrders = async () => {
  const { data, error } = await MetricsApi.getMonthCanceledOrdes()

  if (error) return $notify.error('Erro ao carregar cancelamentos.')

  items.value.canceledOrders = data
}

onMounted(async () => {
  loading.value = true
  await Promise.all([getMonthReceipts(), getMonthOrders(), getDayOrders(), getCanceledOrders()])
  loading.value = false
})
</script>

<template>
  <div class="w-full" v-if="loading">
    <MetricsCardsSkeleton />
  </div>
  <div class="flex items-center gap-4 w-full py-2" v-else>
    <Card class="rounded-md w-[25%]">
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between">
          <CardTitle class="font-semibold text-md">Receita total (mês)</CardTitle>
          <DollarSign class="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <span class="font-bold text-2xl">
          {{
            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              items.receipt.receipt / 100
            )
          }}
        </span>
        <p class="text-muted-foreground text-xs mt-1">
          <span :class="setDiffField(items.receipt.diffFromLastMonth).color">
            {{ setDiffField(items.receipt.diffFromLastMonth).value }}
          </span>
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
    <Card class="rounded-md w-[25%]">
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between">
          <CardTitle class="font-semibold text-md">Pedidos (mês)</CardTitle>
          <Utensils class="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <span class="font-bold text-2xl">{{ items.monthOrders.amount }}</span>
        <p class="text-muted-foreground text-xs mt-1">
          <span :class="setDiffField(items.monthOrders.diffFromLastMonth).color">
            {{ setDiffField(items.monthOrders.diffFromLastMonth).value }}
          </span>
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
    <Card class="rounded-md w-[25%]">
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between">
          <CardTitle class="font-semibold text-md">Pedidos (dia)</CardTitle>
          <Utensils class="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <span class="font-bold text-2xl">{{ items.dayOrders.amount }}</span>
        <p class="text-muted-foreground text-xs mt-1">
          <span :class="setDiffField(items.dayOrders.diffFromYesterday).color">
            {{ setDiffField(items.dayOrders.diffFromYesterday).value }}
          </span>
          em relação a ontem
        </p>
      </CardContent>
    </Card>
    <Card class="rounded-md w-[25%]">
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between">
          <CardTitle class="font-semibold text-md">Cancelamentos (mês)</CardTitle>
          <DollarSign class="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <span class="font-bold text-2xl">{{ items.canceledOrders.amount }}</span>
        <p class="text-muted-foreground text-xs mt-1">
          <span :class="setDiffField(items.canceledOrders.diffFromLastMonth, true).color">
            {{ setDiffField(items.canceledOrders.diffFromLastMonth).value }}
          </span>
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  </div>
</template>
