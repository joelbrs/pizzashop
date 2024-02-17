<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ref, watch } from 'vue'

const $emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

defineProps<{
  class?: string
  label: string
  items: any[]
  itemText: string
  itemValue: string
}>()

const select = ref('')

watch(
  () => select.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  }
)
</script>

<template>
  <Select v-model:model-value="select">
    <SelectTrigger :class="class">
      <SelectValue :placeholder="label" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="item in items" :key="item[itemValue]" :value="item[itemValue]">
          {{ item[itemText] }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
