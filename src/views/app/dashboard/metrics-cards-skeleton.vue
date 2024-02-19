<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
</script>

<template>
  <div class="flex items-center gap-4 w-full py-2">
    <Card v-for="(_, i) in 5" :key="i" class="rounded-md w-[25%]">
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between">
          <CardTitle class="font-semibold text-md">
            <Skeleton class="w-[8vw] h-3" />
          </CardTitle>
          <Skeleton class="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent class="mt-3">
        <span class="font-bold text-2xl">
          <Skeleton class="h-6 w-[7vw]" />
        </span>
        <p class="text-muted-foreground text-xs mt-2">
          <Skeleton class="w-[10vw] h-2" />
        </p>
      </CardContent>
    </Card>
  </div>
</template>
