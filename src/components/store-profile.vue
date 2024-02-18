<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLoginStore } from '@/stores/login'
import { onMounted, ref } from 'vue'
import { UserApi } from '@/services'
import { useNotify } from '@/plugins/toast-notify'

const $notify = useNotify()
const $loginStore = useLoginStore()

const loading = ref(false)

const restaurant = ref({
  name: '',
  description: ''
})

const saveChanges = async () => {
  loading.value = true
  const {error} = await UserApi.putRestaurantInfos(restaurant.value)
  loading.value = false

  if (error) return $notify.error('Erro ao atualizar informações do restaurante.')

  $notify.ok()
  $loginStore.restaurant.name = restaurant.value.name
  $loginStore.restaurant.description = restaurant.value.description
}

onMounted(() => {
  restaurant.value = {
    description: $loginStore.restaurant.description,
    name: $loginStore.restaurant.name
  }
})
</script>

<template>
    <DialogContent class="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis aos seus clientes.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="nome" class="text-right">
            Nome
          </Label>
          <Input id="nome" v-model:model-value="restaurant.name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right">
            Descrição
          </Label>
          <Textarea id="description" v-model:model-value="restaurant.description" class="col-span-3 min-h-[100px]" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button  :disabled="loading" variant="ghost">
            Cancelar
          </Button>
        </DialogClose>
        <Button :loading="loading" :disabled="loading" @click.prevent.stop="saveChanges" class="bg-emerald-600 hover:bg-emerald-500 text-white">
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
</template>