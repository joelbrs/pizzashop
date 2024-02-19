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
import { toggleTheme, verifyThemeSystem } from '@/plugins/theme-provider'
import { onMounted } from 'vue'

onMounted(() => {
  verifyThemeSystem()
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
        <DropdownMenuItem @click="toggleTheme('system')">
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
