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
import { types as drinkTypes } from '@/services/drink'

defineProps({
  types: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const getType = (type: string) => drinkTypes[type as keyof typeof drinkTypes]
</script>

<style lang="scss" src="./DrinkTypes.scss"></style>
