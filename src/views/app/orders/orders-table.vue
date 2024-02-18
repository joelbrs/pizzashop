<script setup lang="ts">
import type { Order } from '@/@types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'

defineProps<{
  orders: Order[]
}>()

const disableCancelBtn = ({status}: Order) => {
  return status === 'delivered' || status === 'canceled'
}

const setStatus = ({status}: Order) => {
  const stts = {
    pending: {name: 'Pendente', color: 'bg-slate-400'},
    processing: {name: 'Em preparo', color: 'bg-amber-500'},
    delivering: {name: 'Em entrega', color: 'bg-amber-500'},
    delivered: { name: 'Entregue', color: 'bg-green-500' },
    canceled: {name: 'Cancelado', color: 'bg-red-500'}
  }

  return stts[status]
}
</script>

<template>
  <div class="border rounded-md">
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="text-muted-foreground font-medium px-6 py-3.5">
              Identificador
            </TableHead>
            <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Realizado há</TableHead>
            <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Status</TableHead>
            <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Cliente</TableHead>
            <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Total do Pedido</TableHead>
            <TableHead class="text-muted-foreground font-medium px-6 py-3.5"></TableHead>
            <TableHead class="text-muted-foreground font-medium px-6 py-3.5"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="order in orders" :key="order.orderId">
            <TableCell class="px-6 py-3.5 font-mono text-xs font-medium w-[10vw]">{{ order.orderId }}</TableCell>
            <TableCell class="px-6 py-3.5 text-muted-foreground w-[10vw]">{{ order.createdAt }}</TableCell>
            <TableCell class="px-6 py-3.5 text-muted-foreground  w-[7vw]">
              <div class="flex items-center gap-2">
                <span :class="`h-2 w-2 rounded-full ${setStatus(order).color}`"></span>
                {{ setStatus(order).name }}
              </div>
            </TableCell>
            <TableCell class="px-6 py-3.5 font-medium w-[45vw]">{{ order.customerName }}</TableCell>
            <TableCell class="px-6 py-3.5 font-medium">
              <div class="flex flex-col">
                <div>{{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total) }}</div>
                <div class="text-xs text-muted-foreground">3 produto(s)</div>
              </div>
            </TableCell>
            <TableCell class="px-6 py-3.5">
                <Button 
                  v-if="order.status !== 'delivered' && order.status !== 'canceled'"
                  @click.prevent.stop="$emit('handle-order', order)"
                  class="bg-background hover:bg-accent text-sm font-medium border border-input text-secondary-foreground hover:text-accent-foreground h-8 rounded-md px-2.5"
                >
                  {{ order.status === 'pending' ? 'Aprovar' : order.status === 'processing' ? 'Em entrega' : 'Entregue'}}
                  <ArrowRight class="w-4 h-4 ml-1" />
                </Button>
            </TableCell>
            <TableCell>
              <Button 
                  @click.prevent.stop="$emit('handle-order', order)"
                  :class="`${!disableCancelBtn(order) ? 'bg-background' : 'bg-transparent'} hover:bg-accent text-sm font-medium  text-secondary-foreground hover:text-accent-foreground h-8 rounded-md px-2.5`"
                  :disabled="disableCancelBtn(order)"
                >
                  <ArrowRight class="w-4 h-4 mr-1" />
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