<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Pizza } from 'lucide-vue-next'
import SignInForm from './forms/sign-in-form.vue'
import SignUpForm from './forms/sign-up-form.vue'
import TabsField from '@/components/tabs-field.vue'
import type { Tab } from '@/components/tabs-field.vue'
import { useLoginStore } from '@/stores/login'
import { verifyThemeSystem } from '@/plugins/theme-provider'

const $loginStore = useLoginStore()

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
  await $loginStore.SIGN_IN(signInForm.value)
  loading.value = false
}

const signUp = async () => {
  loading.value = true
  await $loginStore.SIGN_UP(signUpForm.value)
  loading.value = false

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

onMounted(() => {
  verifyThemeSystem()
})
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
@/plugins/theme-provider
