<script setup lang="ts">
import { Moon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { onMounted } from 'vue';

type Theme = 'dark' | 'light'

const toggleTheme = (theme: Theme) => {
  const classTheme = document.querySelector('body')

  if (theme === 'dark' && !classTheme?.classList.contains('dark')) {
    classTheme?.classList.add('dark')
  }
  
  if (theme === 'light' && classTheme?.classList.contains('dark')) {
    classTheme?.classList.remove('dark')
  }
  localStorage.setItem('pizza-shop-theme', theme)
}

onMounted(() => {
  const theme: string | null = localStorage.getItem('pizza-shop-theme')

  if (theme) {
    toggleTheme(theme as Theme)
  }
})

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="h-10 w-10" variant="outline">
        <div>
          <Moon class="w-5 h-5" />
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="relative right-11 w-30">
      <DropdownMenuGroup>
        <DropdownMenuItem @click="toggleTheme('light')">
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem @click="toggleTheme('dark')">
          <span>Dark</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
