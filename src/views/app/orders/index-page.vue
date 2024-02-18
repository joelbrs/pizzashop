<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Search, X, Loader2 } from 'lucide-vue-next'
import PaginationApp from '@/components/pagination-app.vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PaginationModel, type Order, type Pagination}  from '@/@types'
import { OrderApi } from '@/services'
import OrdersTable from './orders-table.vue'
import SelectField from '@/components/select-field.vue'
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

const defineHandler = ({status}: Order) => {
  const stts = {
    pending: 'approve',
    processing: 'dispatch',
    delivering: 'deliver',
    canceled: 'cancel'
  }

  return status in stts && stts[status as keyof typeof stts] || stts.canceled
}

const getOrders = async () => {
  const { customerName, orderId, status } = filters.value

  const params = {
    status: status && status !== 'all' ? status : null,
    orderId: orderId || null,
    customerName: customerName || null,
    pageIndex: pagination.value.pageIndex
  }

  loading.value = true
  const { data, error } = await OrderApi.getOrders({ ...params })
  loading.value = false

  if (error) return $notify.error('Erro ao carregar os pedidos.')

  orders.value = data.orders
  pagination.value = new PaginationModel(data.meta)
}

const handleOrder = async (order: Order) => {
  const handler = defineHandler(order)

  const handlers = {
    approve: async ({orderId}: Order) => {
      const { error } = await OrderApi.approveOrder(orderId)

      if (error) return $notify.error('Erro ao aprovar pedido!')

      $notify.ok('Pedido aprovado!')
    },
    dispatch: async ({orderId}: Order) => {
      const { error } = await OrderApi.dispatchOrder(orderId)

      if (error) return $notify.error('Erro ao despachar pedido!')

      $notify.ok('Pedido despachado!')
    },
    deliver: async ({orderId}: Order) => {
      const { error } = await OrderApi.deliverOrder(orderId)

      if (error) return $notify.error('Erro ao entregar pedido!')

      $notify.ok('Pedido entregue!')
    },
    cancel: async ({orderId}: Order) => {
      const { error } = await OrderApi.cancelOrder(orderId)

      if (error) return $notify.error('Erro ao cancelar pedido!')

      $notify.ok('Pedido Cancelado!')
    }
  }

  if (handler in handlers) {
    handlers[handler as keyof typeof handlers](order)
    await getOrders()
  }
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
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold tracking-tight">Pedidos</h1>
      <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
    </div>
    <form @submit.prevent.stop="getOrders" class="flex items-center gap-2 mt-3">
      <span class="text-sm font-semibold">Filtros:</span>
      <Input
        v-model:model-value="filters.orderId"
        class="h-8 w-[11vw]"
        placeholder="ID do Pedido"
      />
      <Input
        v-model:model-value="filters.customerName"
        class="h-8 w-[16.5vw]"
        placeholder="Nome do Cliente"
      />
      <div>
        <SelectField
          v-model:model-value="filters.status"
          class="h-8 w-[9.5vw]"
          label="Status"
          :items="status"
          item-value="id"
          item-text="text"
        />
      </div>

      <Button type="submit" :loading="loading" :disabled="loading" class="bg-muted hover:bg-primary-foreground text-white h-8 p-2">
        <Search v-if="!loading" class="h-4 w-4 mr-2" />
        Filtrar Resultados
      </Button>

      <Button @click="handleCleanFilters" :disabled="disableCleanFilter" variant="outline" class="text-white h-8 p-2">
        <X class="h-4 w-4 mr-2" />
        Remover Filtros
      </Button>
    </form>

    <div class="w-full flex flex-col gap-2 mt-1">
      <OrdersTable @handle-order="handleOrder($event)" :orders="orders" />
      <div class="self-end w-full">
        <PaginationApp :pagination="pagination" @handle-pagination="handlePagination($event)"/>
      </div>
    </div>
  </div>
</template>
