<template>
  <v-card-text class="drink-characteristics">
    <drink-price
      v-if="drink.priceLittleSize"
      :discount="drink.discount"
      :in-stock="drink.inStock"
      :price-little-size="drink.priceLittleSize"
    />
    <div v-else class="drink-characteristics__price">
      {{ drink.priceLittleSize }} ₽
    </div>

    <div class="drink-characteristics__description">
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
import { DrinkData } from '@/types/product'
import { truncate } from '@/utils/text'

import DrinkTypes from '@/components/Drink/DrinkTypes/DrinkTypes.vue'
import DrinkPrice from '@/components/Drink/DrinkPrice/DrinkPrice.vue'

defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})
</script>

<style lang="scss" src="./DrinkCharacteristics.scss"></style>
