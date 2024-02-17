<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Search, X } from 'lucide-vue-next'
import PaginationApp from '@/components/PaginationApp.vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PaginationModel, type Order, type Pagination}  from '@/@types'
import { OrderApi } from '@/services'
import OrdersTable from './orders-table.vue'
import SelectField from '@/components/SelectField.vue'
import { useNotify } from '@/plugins/toast-notify'

const $notify = useNotify()

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
const pagination = ref<Pagination>(new PaginationModel())
const orders = ref<Order[]>([])

const disableCleanFilter = computed(() => {
  return !Object.keys(filters.value).find(filter => filters.value[filter as keyof typeof filters.value])
})

const getOrders = async () => {
  const params = {
    status: filters.value.status && filters.value.status !== 'all' || null,
    orderId: filters.value.orderId || null,
    customerName: filters.value.customerName || null,
    pageIndex: pagination.value.pageIndex
  }

  loading.value = true
  const { data, error } = await OrderApi.getOrders({ ...params })
  loading.value = false

  if (error) return $notify.error('Erro ao carregar os pedidos.')

  orders.value = data.orders
  pagination.value = data.meta
}

const handlePagination = async ($event: number) => {
  pagination.value.pageIndex = $event

  await getOrders()
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

    <div class="w-full flex flex-col gap-2 ">
      <OrdersTable :orders="orders" />
      <div class="self-end w-full">
        <PaginationApp :pagination="pagination" :handle-pagination="handlePagination"/>
      </div>
    </div>
  </div>
</template>
