<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Order } from '@/@types'
import { OrderApi } from '@/services'
import DataTable from '@/components/DataTable.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import SelectField from '@/components/SelectField.vue'
import { useNotify } from '@/plugins/toast-notify'

const $notify = useNotify()

const columns: ColumnDef<any, string>[] = [
  {
    accessorKey: 'orderId',
    header: 'Identificador',
    cell: ({ row }) => h('div', { class: 'font-mono text-xs font-medium' }, row.getValue('orderId'))
  },
  {
    accessorKey: 'createdAt',
    header: 'Realizado há',
    cell: ({ row }) => h('div', { class: 'text-muted-foreground' }, row.getValue('createdAt'))
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h('div', { class: 'text-muted-foreground' }, row.getValue('status'))
  },
  {
    accessorKey: 'customerName',
    header: 'Cliente',
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('customerName'))
  },
  {
    accessorKey: 'total',
    header: 'Total do Pedido',
    cell: ({ row }) => h('div', { class: 'text-medium' }, Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.getValue('total')))
  }
]

const status = [
  {
    id: 'all',
    text: 'Todos Status'
  },
  {
    id: 'pending',
    text: 'Pendente'
  },
  {
    id: 'canceled',
    text: 'Cancelado'
  },
  {
    id: 'processing',
    text: 'Em Preparo'
  },
  {
    id: 'delivering',
    text: 'Em Entrega'
  },
  {
    id: 'delivered',
    text: 'Entregue'
  }
]

const filters = ref({
  status: '',
  orderId: '',
  customerName: ''
})

const loading = ref(false)
const orders = ref<Order[]>([])

const disableCleanFilter = computed(() => {
  return !Object.keys(filters.value).find(filter => filters.value[filter as keyof typeof filters.value])
})

const getOrders = async () => {
  const params = {
    status: filters.value.status || null,
    orderId: filters.value.orderId || null,
    customerName: filters.value.customerName || null,
    pageIndex: 0
  }

  loading.value = true
  const { data, error } = await OrderApi.getOrders({ ...params })
  loading.value = false

  if (error) return $notify.error('Erro ao carregar os pedidos.')

  orders.value = data.orders
}

const handleCleanFilters = async () => {
  filters.value = {
    status: '',
    orderId: '',
    customerName: ''
  }

  await getOrders()
}

onMounted(async () => {
  await getOrders()
})
</script>

<template>
  <div class="flex flex-col items-start justify-center px-8 py-6 gap-2">
    <h1 class="text-3xl font-bold tracking-tight">Pedidos</h1>
    <form @submit.prevent.stop="getOrders" class="flex items-center gap-2 mt-2">
      <span class="text-sm font-semibold">Filtros:</span>
      <Input
        v-model:model-value="filters.orderId"
        class="h-8 w-[12vw]"
        placeholder="ID do Pedido"
      />
      <Input
        v-model:model-value="filters.customerName"
        class="h-8 w-[20.75vw]"
        placeholder="Nome do Cliente"
      />
      <div>
        <SelectField
          v-model:model-value="filters.status"
          class="h-8 w-[12vw]"
          label="Status"
          :items="status"
          item-value="id"
          item-text="text"
        />
      </div>

      <Button type="submit" :loading="loading" :disabled="loading" class="bg-muted hover:bg-primary-foreground text-white h-8 p-2">
        <Search class="h-4 w-4 mr-2" />
        Filtrar Resultados
      </Button>

      <Button @click="handleCleanFilters" :disabled="disableCleanFilter" variant="outline" class="text-white h-8 p-2">
        <X class="h-4 w-4 mr-2" />
        Remover Filtros
      </Button>
    </form>

    <div class="w-full">
      <DataTable :columns="columns" :data="orders" />
    </div>
  </div>
</template>
