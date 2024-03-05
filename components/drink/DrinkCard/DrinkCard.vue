<template>
  <v-card class="drink-card" @click="openDrinkModal">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      v-if="drink.images.length > 0"
      :src="drink.images[0]"
      height="250"
      cover
    />

    <template #title>
      <v-card-title class="drink-card__title">
        {{ drink.name }}

        <v-icon
          v-if="drink.discount"
          color="error"
          icon="mdi-fire-circle"
          size="small"
        />
      </v-card-title>
    </template>

    <drink-characteristics :drink="drink" />

    <drink-modal
      v-model="isDrinkModalOpen"
      :drink="drink"
      :bottle="bottle"
      :boules="boules"
      @close="closeDrinkModal"
    />
  </v-card>
</template>

<script setup lang="ts">
import type { DrinkData } from '@/types/product'

import { useDrinkModal, DrinkModal } from '@/components/modals/DrinkModal'
import DrinkCharacteristics from '../DrinkCharacteristics'

defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
  boules: {
    type: Boolean,
    default: false,
  },
  bottle: {
    type: Boolean,
    default: false,
  },
})

const { isDrinkModalOpen, openDrinkModal, closeDrinkModal } = useDrinkModal()
</script>

<style lang="scss" src="./DrinkCard.scss"></style>
