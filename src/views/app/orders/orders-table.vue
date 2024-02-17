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

defineProps<{
  orders: Order[]
}>()
</script>

<template>
<Table class="rounded-md border">
    <TableHeader>
      <TableRow>
        <TableHead class="text-muted-foreground font-medium px-6 py-3.5">
          Identificador
        </TableHead>
        <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Realizado há</TableHead>
        <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Status</TableHead>
        <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Cliente</TableHead>
        <TableHead class="text-muted-foreground font-medium px-6 py-3.5">Total do Pedido</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="order in orders" :key="order.orderId">
        <TableCell class="px-6 py-3.5">{{ order.orderId }}</TableCell>
        <TableCell class="px-6 py-3.5">{{ order.createdAt }}</TableCell>
        <TableCell class="px-6 py-3.5">{{ order.status }}</TableCell>
        <TableCell class="px-6 py-3.5">{{ order.customerName }}</TableCell>
        <TableCell class="px-6 py-3.5">{{ order.total }}</TableCell>
      </TableRow>
      <TableRow v-if="orders.length === 0">
        <TableCell :colSpan="5" class="h-24 text-center">
          Nenhum resultado encontrado.
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>