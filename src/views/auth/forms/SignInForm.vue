<script setup lang="ts">
import { ref, watch } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const $emits = defineEmits<{
  (e: 'sign-in'): void
  (e: 'update:modelValue', value: Object): void
}>()

defineProps<{
  loading: boolean
}>()

const form = ref({
  email: ''
})

watch(
  () => form.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', form.value)
    }
  },
  { deep: true }
)
</script>

<template>
  <form @submit.prevent.stop="$emit('sign-in')">
    <Label for="email">E-mail</Label>
    <Input id="email" type="email" required v-model:model-value="form.email" placeholder="E-mail" />

    <div class="flex items-center justify-center mt-5">
      <Button :loading="loading" :disabled="loading" type="submit" class="w-full">
        Acessar Painel
      </Button>
    </div>
  </form>
</template>
