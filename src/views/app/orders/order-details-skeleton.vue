<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader
} from '@/components/ui/table'
</script>

<template>
  <div class="flex flex-col gap-5">
    <Table>
      <TableBody>
        <TableRow>
          <TableCell class="text-muted-foreground">Status</TableCell>
          <TableCell class="flex justify-end">
            <Skeleton class="w-[8vw] h-2" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="text-muted-foreground">Cliente</TableCell>
          <TableCell class="flex justify-end">
            <Skeleton class="w-[8vw] h-2" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="text-muted-foreground">Telefone</TableCell>
          <TableCell :class="`flex justify-end`">
            <Skeleton class="w-[8vw] h-2" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="text-muted-foreground">E-mail</TableCell>
          <TableCell class="flex justify-end"><Skeleton class="w-[8vw] h-2" /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="text-muted-foreground">Criado há</TableCell>
          <TableCell class="flex justify-end text-muted-foreground">
            <Skeleton class="w-[8vw] h-2" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Qtd.</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>SubTotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(_, i) in 3" :key="i">
          <TableCell><Skeleton class="w-24 h-2" /></TableCell>
          <TableCell class="text-center"><Skeleton class="w-24 h-2" /></TableCell>
          <TableCell>
            <Skeleton class="w-24 h-2" />
          </TableCell>
          <TableCell>
            <Skeleton class="w-24 h-2" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
