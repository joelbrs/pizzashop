<script setup lang="ts">
import type { OrderDetailDTOOut } from '@/@types';
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OrderApi } from '@/services';
import { Search } from 'lucide-vue-next'
import { useNotify } from '@/plugins/toast-notify'
import OrderStatus from '@/components/order-status.vue'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  id: string
}>()

const $notify = useNotify()

const loading = ref(false)
const order = ref<OrderDetailDTOOut>()

const getOrder = async () => {
  loading.value = true
  const { data, error } = await OrderApi.getOrderById(props.id)
  loading.value = false

  if (error) return $notify.error('Erro ao detalhar pedido.')

  order.value = data
}

const getTotal = ({ price, quantity }: { price: number, quantity: number }) => {
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price * quantity / 100)
}

onMounted(async () => {
  await getOrder()
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
        <Button class="bg-background hover:bg-accent text-sm font-medium border border-input text-secondary-foreground hover:text-accent-foreground h-8 rounded-md px-2.5">
          <Search class="w-3 h-3"/>
        </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[520px] sm:rounded-lg">
      <DialogHeader>
        <DialogTitle>Pedido: {{ order?.id }}</DialogTitle>
        <DialogDescription>
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-5">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell class="text-muted-foreground">Status</TableCell>
              <TableCell class="flex justify-end">
                <OrderStatus :status="order?.status" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="text-muted-foreground">Cliente</TableCell>
              <TableCell class="flex justify-end">{{ order?.customer.name }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="text-muted-foreground">Telefone</TableCell>
              <TableCell :class="`flex justify-end ${!order?.customer.phone ? 'italic text-muted-foreground' : ''}`">
                {{ order?.customer.phone || 'Não informado.' }}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="text-muted-foreground">E-mail</TableCell>
              <TableCell class="flex justify-end">{{ order?.customer.email }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="text-muted-foreground">Criado há</TableCell>
              <TableCell class="flex justify-end">{{ order?.createdAt }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="px-6 py-3.5">Produto</TableHead>
              <TableHead class="px-6 py-3.5">Qtd.</TableHead>
              <TableHead class="px-6 py-3.5">Preço</TableHead>
              <TableHead class="px-6 py-3.5">SubTotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in order?.orderItems" :key="item.id">
              <TableCell class="px-4 py-3.5">{{ item.product.name }}</TableCell>
              <TableCell class="text-center px-4 py-3.5">{{ item.quantity }}</TableCell>
              <TableCell class="px-4 py-3.5">
                {{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.priceInCents / 100) }}
              </TableCell>
              <TableCell class="px-4 py-3.5">
                {{ getTotal({price: item.priceInCents, quantity: item.quantity}) }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  </Dialog>
</template>