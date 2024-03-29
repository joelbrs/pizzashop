<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface Tab {
  id: string
  label: string
  title: string
  description?: string
}

const $emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

defineProps<{
  tabs: Tab[]
}>()

const currentTab = ref('')

watch(
  () => currentTab.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  }
)
</script>

<template>
  <Tabs v-model:model-value="currentTab" :default-value="tabs[0].id" class="w-[25vw]">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger v-for="tab in tabs" :key="tab.id" :value="tab.id"> {{ tab.label }} </TabsTrigger>
    </TabsList>
    <TabsContent v-for="tab in tabs" :key="tab.id" :value="tab.id">
      <Card>
        <CardHeader>
          <CardTitle class="text-xl font-semibold">{{ tab.title }}</CardTitle>
          <CardDescription class="text-muted-foreground text-sm">
            {{ tab.description }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <slot :name="`content-${tab.id}`" />
        </CardContent>

        <div class="flex items-center justify-center w-full">
          <slot :name="`footer-${tab.id}`" />
        </div>
      </Card>
    </TabsContent>
  </Tabs>
</template>
