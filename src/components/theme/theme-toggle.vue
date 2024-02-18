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
        <DropdownMenuItem>
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
