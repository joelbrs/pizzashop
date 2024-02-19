<script setup lang="ts">
import type { OrderDetailDTOOut } from '@/@types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { OrderApi } from '@/services'
import { Search } from 'lucide-vue-next'
import { useNotify } from '@/plugins/toast-notify'
import OrderStatus from '@/components/order-status.vue'
import { TimeToNow } from '@/plugins/time-provider'
import { ref } from 'vue'

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

const getTotal = ({ price, quantity }: { price: number; quantity: number }) => {
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    (price * quantity) / 100
  )
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        @click.prevent.stop="getOrder()"
        class="bg-background hover:bg-accent text-sm font-medium border border-input text-secondary-foreground hover:text-accent-foreground h-8 rounded-md px-2.5"
      >
        <Search class="w-3 h-3" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[520px] sm:rounded-lg">
      <DialogHeader>
        <DialogTitle>Pedido: {{ order?.id }}</DialogTitle>
        <DialogDescription> Detalhes do pedido </DialogDescription>
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
              <TableCell
                :class="`flex justify-end ${!order?.customer.phone ? 'italic text-muted-foreground' : ''}`"
              >
                {{ order?.customer.phone || 'Não informado.' }}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="text-muted-foreground">E-mail</TableCell>
              <TableCell class="flex justify-end">{{ order?.customer.email }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="text-muted-foreground">Criado há</TableCell>
              <TableCell class="flex justify-end text-muted-foreground">
                {{ TimeToNow(order?.createdAt) }}
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
            <TableRow v-for="item in order?.orderItems" :key="item.id">
              <TableCell>{{ item.product.name }}</TableCell>
              <TableCell class="text-center">{{ item.quantity }}</TableCell>
              <TableCell>
                {{
                  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    item.priceInCents / 100
                  )
                }}
              </TableCell>
              <TableCell>
                {{ getTotal({ price: item.priceInCents, quantity: item.quantity }) }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  </Dialog>
</template>
