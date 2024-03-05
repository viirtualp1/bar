<template>
  <div class="bar-locations">
    <v-chip
      v-for="location in locations"
      class="bar-locations__location"
      color="teal"
      text-color="white"
    >
      <v-icon :icon="availableLocations[location].icon" class="mr-1" />

      {{ getLocation(location) }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { availableLocations } from '@/services/product'

defineProps({
  locations: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
})

const getLocation = (location: number) =>
  availableLocations[location as keyof typeof availableLocations]
</script>

<style lang="scss" src="./BarLocations.scss"></style>
