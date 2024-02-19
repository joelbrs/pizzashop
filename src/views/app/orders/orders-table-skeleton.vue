<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
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
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5"
            >Total do Pedido</TableHead
          >
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5"></TableHead>
          <TableHead class="text-muted-foreground font-medium px-6 py-3.5"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(_, index) in 10" :key="index">
          <TableCell class="px-4 py-3.5 font-mono text-xs font-medium">
            <div class="flex items-center gap-5">
              <Skeleton class="h-4 w-3 rounded-md px-2.5" />
              <Skeleton class="h-3 w-[10vw]" />
            </div>
          </TableCell>
          <TableCell class="px-6 py-3.5 text-muted-foreground">
            <Skeleton class="h-3 w-[10vw]" />
          </TableCell>
          <TableCell class="px-6 py-3.5 text-muted-foreground">
            <Skeleton class="h-3 w-[7vw]" />
          </TableCell>
          <TableCell class="px-6 py-3.5 font-medium">
            <Skeleton class="h-3 w-[20vw]" />
          </TableCell>
          <TableCell class="px-6 py-3.5 font-medium">
            <div class="flex flex-col">
              <Skeleton class="h-3 w-[10vw]" />
            </div>
          </TableCell>
          <TableCell class="px-6 py-3.5">
            <Skeleton class="h-3 rounded-md px-2.5 border border-input w-[5vw]" />
          </TableCell>
          <TableCell>
            <Skeleton class="h-3 rounded-md px-2.5 border border-input w-[5vw]" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
