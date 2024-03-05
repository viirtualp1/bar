<template>
  <v-card-text class="drink-characteristics">
    <drink-price
      v-if="drink.price.small"
      :discount="drink.discount"
      :in-stock="drink.inStock"
      :price="drink.price.small"
    />
    <div v-else class="drink-characteristics__price">
      {{ drink.price.default }} ₽
    </div>

    <div v-if="drink.description" class="drink-characteristics__description">
      {{ truncate(drink.description) }}
    </div>

    <div class="drink-characteristics__chips">
      <v-chip class="drink-characteristics__chip" color="error">
        Крепкость {{ drink.strength }}%
      </v-chip>
      <v-chip class="drink-characteristics__chip" color="success">
        Плотность {{ drink.density }}%
      </v-chip>
    </div>

    <drink-types :types="drink.types" />

    <bar-locations :locations="drink.locations" />
  </v-card-text>
</template>

<script setup lang="ts">
import type { DrinkData } from '@/types/product'
import { truncate } from '@/utils/text'

import { DrinkTypes, DrinkPrice } from '@/components/Drink'

defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})
</script>

<style lang="scss" src="./DrinkCharacteristics.scss"></style>
