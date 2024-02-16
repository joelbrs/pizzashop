<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from '@/components/theme/ThemeToggle.vue'
import BtnUser from '@/components/BtnUser.vue'
import { Separator } from '@/components/ui/separator'
import { Pizza, Home, UtensilsCrossed } from 'lucide-vue-next'

type Routes = 'dashboard' | 'orders'

const $route = useRoute()

const active = ref({
  dashboard: false,
  orders: false
})

const activate = ({ name }: { name: Routes }) => {
  for (const key in active.value) {
    if (key !== name) {
      active.value[key as keyof typeof active.value] = false
    }
  }
  active.value[name as keyof typeof active.value] = true
}

const setActive = (isActive: boolean) => {
  if (isActive) {
    return 'text-foreground'
  }
  return 'hover:text-foreground'
}

onMounted(() => {
  const { name } = $route

  if (name) {
    activate({ name: name as Routes })
  }
})
</script>

<template>
  <header class="flex justify-between py-3 px-6 border-b">
    <div class="flex">
      <div class="flex items-center gap-6">
        <Pizza class="w-6 h-6" />
        <Separator class="h-6" orientation="vertical" />
      </div>
      <nav class="flex items-center gap-6 px-6 text-sm text-muted-foreground font-medium">
        <RouterLink @click="activate({ name: 'dashboard' })" :to="{ name: 'dashboard' }">
          <div :class="`flex items-center gap-1.5 ${setActive(active.dashboard)}`">
            <Home class="w-4 h-4" />
            Início
          </div>
        </RouterLink>
        <RouterLink @click="activate({ name: 'orders' })" :to="{ name: 'dashboard' }">
          <div :class="`flex items-center gap-1.5 ${setActive(active.orders)}`">
            <UtensilsCrossed class="h-4 w-4" />
            Pedidos
          </div>
        </RouterLink>
      </nav>
    </div>
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <BtnUser />
    </div>
  </header>
</template>
