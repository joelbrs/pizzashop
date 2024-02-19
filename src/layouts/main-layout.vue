<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import HeaderApp from '@/components/header-app.vue'
import { verifyThemeSystem } from '@/plugins/theme-provider'

onMounted(() => {
  verifyThemeSystem()
})
</script>

<template>
  <HeaderApp />
  <RouterView />
</template>
