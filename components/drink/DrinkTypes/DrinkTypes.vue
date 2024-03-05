<template>
  <div class="drink-types">
    <v-chip
      class="drink-types__type"
      v-for="(type, idx) in types"
      :key="idx"
      color="info"
    >
      {{ getType(type) }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { DrinkCategories } from '@/services/product'

defineProps({
  types: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const getType = (type: string) =>
  DrinkCategories[type as keyof typeof DrinkCategories]
</script>

<style lang="scss" src="./DrinkTypes.scss"></style>
