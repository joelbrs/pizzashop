<script setup lang="ts">
import { ref, watch } from 'vue'
import { LoginApi, RestaurantApi } from '@/services'
import { Pizza } from 'lucide-vue-next'
import { useNotify } from '@/plugins/toast-notify'
import SignInForm from './forms/sign-in-form.vue'
import SignUpForm from './forms/sign-up-form.vue'
import TabsField from '@/components/tabs-field.vue'
import type { Tab } from '@/components/tabs-field.vue'

const $notify = useNotify()

const loading = ref(false)

const tab = ref('sign-in')

const signInForm = ref({
  email: ''
})

const signUpForm = ref({
  email: '',
  managerName: '',
  phone: '',
  restaurantName: ''
})

const tabs: Tab[] = [
  {
    id: 'sign-in',
    label: 'Fazer Login',
    title: 'Acessar Painel',
    description: 'Acompanhe suas vendas pelo painel do parceiro!'
  },
  {
    id: 'sign-up',
    label: 'Criar Conta',
    title: 'Novo Estabelecimento',
    description: 'Seja um parceiro e comece suas vendas!'
  }
]

const signIn = async () => {
  loading.value = true
  const { error } = await LoginApi.postAuthenticate(signInForm.value)
  loading.value = false

  if (error) return $notify.error('Credenciais Inválidas!')

  $notify.ok('Enviamos um link de autenticação para seu e-mail.')
}

const signUp = async () => {
  loading.value = true
  const { error } = await RestaurantApi.createRestaurant(signUpForm.value)
  loading.value = false

  if (error) return $notify.error('Credenciais Inválidas!')

  $notify.ok()
  tab.value = 'sign-in'
}

const cleanFields = () => {
  signInForm.value = {
    email: ''
  }

  signUpForm.value = {
    email: '',
    managerName: '',
    phone: '',
    restaurantName: ''
  }
}

watch(
  () => tab.value,
  (newValue) => {
    if (newValue) {
      cleanFields()
    }
  }
)
</script>

<template>
  <div class="flex items-center text-muted-foreground font-semibold">
    <div class="flex flex-col items-start justify-between bg-muted w-[50%] h-screen p-10">
      <div class="flex text-foreground text-lg gap-3 items-center">
        <Pizza class="w-5 h-5" />
        <span>Pizza Shop</span>
      </div>
      <footer class="text-sm">Painel do parceiro © pizza.shop - 2024</footer>
    </div>
    <div class="flex items-center justify-center w-[50%] h-screen">
      <TabsField v-model:model-value="tab" :tabs="tabs">
        <template #content-sign-in>
          <SignInForm v-model:model-value="signInForm" :loading="loading" @sign-in="signIn" />
        </template>
        <template #content-sign-up>
          <SignUpForm v-model:model-value="signUpForm" :loading="loading" @sign-up="signUp" />
        </template>
      </TabsField>
    </div>
  </div>
</template>