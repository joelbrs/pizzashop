<script setup lang="ts">
import type { OrderStatus } from '@/@types'

const props = defineProps<{
  status?: OrderStatus
}>()

const setStatus = () => {
  const stts = {
    pending: {name: 'Pendente', color: 'bg-slate-400'},
    processing: {name: 'Em preparo', color: 'bg-amber-500'},
    delivering: {name: 'Em entrega', color: 'bg-amber-500'},
    delivered: { name: 'Entregue', color: 'bg-green-500' },
    canceled: {name: 'Cancelado', color: 'bg-red-500'}
  }

  return stts[props.status || 'pending']
}
</script>

<template>
  <div class="flex items-center gap-2">
    <span :class="`h-2 w-2 rounded-full ${setStatus().color}`"></span>
      {{ setStatus().name }}
    </div>
</template>