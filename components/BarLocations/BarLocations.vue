<template>
  <div class="bar-locations">
    <v-chip
      v-for="location in locations"
      class="bar-locations__location"
      color="teal"
      text-color="white"
    >
      <v-icon v-if="location === 0" icon="mdi-glass-mug-variant" class="mr-1" />
      <v-icon v-if="location === 1" icon="mdi-car-back" class="mr-1" />

      {{ getLocation(location) }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { locations as drinkLocations } from '@/services/drink'

defineProps({
  locations: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
})

const getLocation = (location: number) =>
  drinkLocations[location as keyof typeof drinkLocations]
</script>

<style lang="scss" src="./BarLocations.scss"></style>
