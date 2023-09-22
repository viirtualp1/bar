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

    <v-card-text>
      <div v-if="!drink.inStock" class="drink-card__price">Нет в наличии</div>
      <div class="drink-card__discount" v-else-if="drink.discount">
        <div class="drink-card__discount-with drink-card__price">
          {{ priceWithDiscount }}
        </div>

        <div class="drink-card__discount-without">
          {{ drink.priceLittleSize }} ₽
        </div>
      </div>

      <div v-else class="drink-card__price">{{ drink.priceLittleSize }} ₽</div>

      <div class="drink-card__description">
        {{ truncate(drink.description) }}
      </div>

      <drink-characteristics :drink="drink" />
    </v-card-text>

    <drink-modal
      v-model="isDrinkModalOpen"
      :drink="drink"
      @close="closeDrinkModal"
    />
  </v-card>
</template>

<script setup lang="ts">
import { DrinkData } from '@/types/product'
import { getPriceWithDiscount } from '@/services/drink'

import useDrinkModal from '@/components/modals/DrinkModal/useDrinkModal'
import DrinkModal from '@/components/modals/DrinkModal/DrinkModal.vue'
import { truncate } from '@/utils/text'

const props = defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const { isDrinkModalOpen, openDrinkModal, closeDrinkModal } = useDrinkModal()

const priceWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return getPriceWithDiscount(props.drink.priceLittleSize, props.drink.discount)
})
</script>

<style lang="scss" src="./DrinkCard.scss"></style>
