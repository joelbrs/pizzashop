<script setup lang="ts">
import { computed } from 'vue'
import { useLoginStore } from '@/stores/login'
import { ChevronDown, Building, LogOut } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const $loginStore = useLoginStore()

const infos = computed(() => {
  return $loginStore.$state
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="flex items-center justify-center gap-2 h-10" variant="outline">
        <h3>{{ infos.restaurant.name }}</h3>
        <ChevronDown class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="relative right-6 w-56">
      <DropdownMenuLabel class="pb-0">{{ infos.user.name }}</DropdownMenuLabel>
      <p class="text-xs text-muted-foreground px-2">{{ infos.user.email }}</p>

      <DropdownMenuSeparator class="mt-2" />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Building class="mr-2 h-4 w-4" />
          <span>Perfil da Loja</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuItem class="text-red-400">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Sair</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
