<script setup lang="ts">
import type { Order } from '@/@types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { TimeToNow } from '@/plugins/time-provider'
import { Button } from '@/components/ui/button'
import OrderDetails from './order-details.vue'
import { ArrowRight } from 'lucide-vue-next'
import OrderStatus from '@/components/order-status.vue'

defineProps<{
  orders: Order[]
}>()

const handleStatusLabel = ({ status }: Order) => {
  const labels = {
    pending: 'Aprovar',
    processing: 'Em entrega',
    delivering: 'Entregue'
  }

  if (status in labels) {
    return labels[status as keyof typeof labels]
  }
}

const disableCancelBtn = ({ status }: Order) => {
  return status === 'delivered' || status === 'canceled'
}
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="text-muted-foreground text-center font-medium px-6 py-3.5">
            Identificador
          </TableHead>
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Realizado há</TableHead>
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Status</TableHead>
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Cliente</TableHead>
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5">
            Total do Pedido
          </TableHead>
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5"></TableHead>
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in orders" :key="order.orderId">
          <TableCell class="px-4 py-3.5 font-mono text-xs font-medium w-[10vw]">
            <div class="flex items-center gap-8">
              <OrderDetails :id="order.orderId" />
              {{ order.orderId }}
            </div>
          </TableCell>
          <TableCell class="px-6 py-3.5 text-muted-foreground w-[10vw]">
            {{ TimeToNow(order.createdAt) }}
          </TableCell>
          <TableCell class="px-6 py-3.5 text-muted-foreground w-[10vw]">
            <OrderStatus :status="order.status" />
          </TableCell>
          <TableCell class="px-6 py-3.5 font-medium w-[45vw]">{{ order.customerName }}</TableCell>
          <TableCell class="px-6 py-3.5 font-medium w-[8vw]">
            <div class="flex flex-col">
              <div>
                {{
                  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    order.total / 100
                  )
                }}
              </div>
              <div class="text-xs text-muted-foreground">3 produto(s)</div>
            </div>
          </TableCell>
          <TableCell class="px-6 py-3.5 w-[9.5vw]">
            <Button
              v-if="order.status !== 'delivered' && order.status !== 'canceled'"
              @click.prevent.stop="$emit('handle-order', order)"
              class="bg-background hover:bg-accent text-sm font-medium border border-input text-secondary-foreground hover:text-accent-foreground h-8 rounded-md px-2.5"
            >
              {{ handleStatusLabel(order) }}
              <ArrowRight class="w-3 h-3 ml-2" />
            </Button>
          </TableCell>
          <TableCell class="w-[6.5vw]">
            <Button
              @click.prevent.stop="$emit('handle-order', order)"
              :class="`bg-transparent hover:bg-accent text-sm font-medium  text-secondary-foreground hover:text-accent-foreground h-8 rounded-md px-2.5`"
              :disabled="disableCancelBtn(order)"
            >
              <ArrowRight class="w-3 h-3 mr-2" />
              Cancelar
            </Button>
          </TableCell>
        </TableRow>
        <TableRow v-if="orders.length === 0">
          <TableCell :colSpan="6" class="h-24 text-center">
            Nenhum resultado encontrado.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
