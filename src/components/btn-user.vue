<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { ChevronDown, LogOut, Building } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import StoreProfile from '@/components/store-profile.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {Dialog, DialogTrigger} from './ui/dialog'

const $router = useRouter()
const $loginStore = useLoginStore()

const infos = computed(() => {
  return $loginStore.$state
})

const logOut = async () => {
  await $loginStore.LOG_OUT()

  await $router.push({name: 'login'})
}
</script>

<template>
  <Dialog>
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
            <DialogTrigger>
              <div class="flex items-center">
                <Building class="mr-2 h-4 w-4" />
                  <span>Perfil da Loja</span>
              </div>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem @click="logOut" class="text-red-400">
          <LogOut class="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <StoreProfile />
  </Dialog>
</template>
