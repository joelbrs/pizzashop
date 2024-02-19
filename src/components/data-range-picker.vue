<script setup lang="ts">
// import { addDays, format } from 'date-fns'
import { $dayjs } from '@/lib/day-js'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { Dayjs } from 'dayjs'

const $emits = defineEmits<{
  (e: 'update:modelValue', value: { start: Dayjs; end: Dayjs }): void
}>()

const date = ref({
  start: $dayjs().subtract(7, 'days').toString(),
  end: $dayjs().toString()
})

watch(
  () => date.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', {
        start: $dayjs(date.value.start),
        end: $dayjs(date.value.end)
      })
    }
  },
  { deep: true }
)
</script>

<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :variant="'outline'"
          :class="
            cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')
          "
        >
          <CalendarIcon class="mr-2 h-4 w-4" />

          <span>
            {{
              date.start
                ? $dayjs(date.end).format('LL')
                  ? `${$dayjs(date.start).format('LL')} - ${$dayjs(date.end).format('LL')}`
                  : $dayjs(date.start).format('LL')
                : 'Selecione uma data'
            }}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar v-model.range="date" :columns="2" />
      </PopoverContent>
    </Popover>
  </div>
</template>
