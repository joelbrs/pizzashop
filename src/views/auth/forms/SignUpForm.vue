<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref, watch } from 'vue'

const $emits = defineEmits<{
  (e: 'sign-up'): void
  (e: 'update:modelValue', value: Object): void
}>()

defineProps<{
  loading: boolean
}>()

const form = ref({
  email: '',
  managerName: '',
  phone: '',
  restaurantName: ''
})

watch(
  () => form.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  },
  { deep: true }
)
</script>

<template>
  <form @submit.prevent.stop="$emit('sign-up')">
    <div class="flex flex-col w-full gap-2">
      <div>
        <Label for="establishment">Nome do Estabelecimento</Label>
        <Input
          id="establishment"
          v-model:model-value="form.restaurantName"
          placeholder="Nome do Estabelecimento"
          required
        />
      </div>
      <div>
        <Label for="name">Nome</Label>
        <Input id="name" v-model:model-value="form.managerName" placeholder="Nome" required />
      </div>
      <div>
        <Label for="email">E-mail</Label>
        <Input
          id="email"
          v-model:model-value="form.email"
          placeholder="E-mail"
          type="email"
          required
        />
      </div>
      <div>
        <Label for="phone">Celular</Label>
        <Input id="phone" v-model:model-value="form.phone" placeholder="Celular" />
      </div>
    </div>
    <div class="flex flex-col items-center justify-center mt-5 text-center">
      <Button :loading="loading" :disabled="loading" class="w-full" type="submit">
        Finalizar Cadastro
      </Button>
      <p class="px-2 text-xs text-muted-foreground mt-2">
        Ao continuar, você concorda com nossos
        <RouterLink class="underline underline-offset-4" :to="{ name: 'login' }">
          termos de serviço
        </RouterLink>
        e
        <RouterLink class="underline underline-offset-4" :to="{ name: 'login' }">
          políticas de privacidade
        </RouterLink>
      </p>
    </div>
  </form>
</template>
