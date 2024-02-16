<script setup lang="ts">
import { ref } from 'vue'
import { Pizza } from 'lucide-vue-next'
import SignInForm from './forms/SignInForm.vue'
import SignUpForm from './forms/SignUpForm.vue'
import TabsField from '@/components/TabsField.vue'
import type { Tab } from '@/components/TabsField.vue'

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
      <TabsField :tabs="tabs">
        <template #content-sign-in>
          <SignInForm v-model:model-value="signInForm" @sign-in="() => {}" />
        </template>
        <template #content-sign-up>
          <SignUpForm v-model:model-value="signUpForm" @sign-up="() => {}" />
        </template>
      </TabsField>
    </div>
  </div>
</template>
