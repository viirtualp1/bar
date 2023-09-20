<template>
  <div class="drink-characteristics">
    <div class="drink-characteristics__chips">
      <v-chip class="drink-characteristics__chip" color="error">
        Крепкость {{ drink.strength }}%
      </v-chip>
      <v-chip class="drink-characteristics__chip" color="success">
        Плотность {{ drink.density }}%
      </v-chip>
    </div>
    <div class="drink-characteristics__chips">
      <v-chip
        class="drink-characteristics__chip"
        color="warning"
        v-if="drink.isFiltered"
      >
        {{ filteredText }}
      </v-chip>
      <v-chip
        class="drink-characteristics__chip"
        v-for="(type, idx) in drink.types"
        :key="idx"
        color="info"
      >
        {{ getType(type) }}
      </v-chip>
    </div>

    <div class="drink-characteristics__locations">
      <template v-if="!small">Доступно в</template>
      <v-chip
        v-for="location in drink.location"
        class="drink-characteristics__location"
        color="teal"
        text-color="white"
      >
        <v-icon icon="mdi-glass-mug-variant" class="mr-1"></v-icon>
        {{ getLocation(location) }}
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DrinkData } from '@/types/product'
import { locations, types } from '@/services/drink'

const props = defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
  small: {
    type: Boolean,
    default: false,
  },
})

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]

const getType = (type: string) => types[type as keyof typeof types]

const filteredText = computed(() => {
  return props.drink.isFiltered ? 'Фильтрованное' : 'Нефильтрованное'
})
</script>

<style lang="scss" src="./DrinkCharacteristics.scss"></style>
