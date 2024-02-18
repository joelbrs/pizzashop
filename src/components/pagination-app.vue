<script setup lang="ts">
import {
  Pagination,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { computed, onMounted, ref } from 'vue'
import { PaginationModel, type Pagination as IPagination } from '@/@types';

interface Props {
  pagination?: any
}

const props = withDefaults(defineProps<Props>(),{
  pagination: new PaginationModel()
})

const page = ref(1)

const totalPages = computed(() => {
  return Math.floor(props.pagination.totalCount / props.pagination.perPage) || 1
})

onMounted(() => {
  page.value = props.pagination.pageIndex + 1
})
</script>

<template>
  <Pagination v-model:page="page" v-slot="{ page }" :total="pagination.totalCount" :sibling-count="1" show-edges :default-page="1">
    <PaginationList class="flex items-center gap-1">
      <div class="flex items-center justify-between w-full">
        <div class="text-sm text-muted-foreground">Total de {{ pagination.totalCount }} item(s)</div>
        <div class="text-sm font-medium mt-1 mr-2">Página {{ page }} de {{ totalPages }}</div>
      </div>
      <PaginationFirst @click="$emit('handle-pagination', (0))" />
      <PaginationPrev @click="$emit('handle-pagination', (props.pagination.pageIndex - 1))"/>
      <PaginationNext @click="$emit('handle-pagination', (props.pagination.pageIndex + 1))"/>
      <PaginationLast @click="$emit('handle-pagination', (totalPages - 1))"/>
    </PaginationList>
  </Pagination>
</template>