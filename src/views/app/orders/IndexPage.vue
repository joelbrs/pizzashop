<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SelectField from '@/components/SelectField.vue'
import { Search, X } from 'lucide-vue-next'

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
  status: status[0].id,
  orderId: '',
  customerName: ''
})
</script>

<template>
  <div class="flex flex-col items-start justify-center px-8 py-6">
    <h1 class="text-3xl font-bold tracking-tight mb-0.5">Pedidos</h1>
    <form @submit.prevent.stop="" class="flex items-center mt-3.5 gap-2">
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

      <Button type="submit" class="bg-muted hover:bg-primary-foreground text-white h-8 p-2">
        <Search class="h-4 w-4 mr-2" />
        Filtrar Resultados
      </Button>

      <Button variant="outline" class="text-white h-8 p-2">
        <X class="h-4 w-4 mr-2" />
        Remover Filtros
      </Button>
    </form>
  </div>
</template>
