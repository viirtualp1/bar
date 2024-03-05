<template>
  <product-modal v-model="currentValue">
    <v-card class="drink-modal__card">
      <product-title @close="close">
        {{ drink.name }}
      </product-title>

      <v-card-text>
        <div v-if="!drink.inStock" class="drink-card__price">Нет в наличии</div>
        <div v-else-if="!drink.price.big" class="drink-card__price">
          {{ drink.price.small }} ₽
        </div>

        <div class="drink-modal__description">{{ drink.description }}</div>

        <div
          class="drink-modal__discount"
          v-if="drink.inStock && drink.discount && drink.price.small"
        >
          <div class="drink-modal__discount-with drink-card__price">
            {{ smallPriceWithDiscount }}
          </div>

          <div class="drink-modal__discount-without">
            {{ drink.price.small }} ₽
          </div>

          <span class="drink-modal__size">за 0,33</span>
        </div>

        <div
          class="drink-modal__discount"
          v-if="drink.discount && drink.price.big"
        >
          <div class="drink-modal__discount-with drink-card__price">
            {{ bigPriceWithDiscount }}
          </div>

          <div class="drink-modal__discount-without">
            {{ drink.price.big }} ₽
          </div>

          <span class="drink-modal__size">за 0,5</span>
        </div>

        <images-slider v-if="drink.images.length > 0" :photos="drink.images" />

        <drink-characteristics
          class="drink-modal__characteristics"
          :drink="drink"
        />
      </v-card-text>
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import { type DrinkData } from '@/types/product'
import { getPriceWithDiscount } from '@/services/product'

import {ProductModal, ProductTitle} from '@/components/Product'
import {DrinkCharacteristics} from '@/components/Drink'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const emit = defineEmits({
  'update:modelValue': (_v: boolean) => true,
})

const currentValue = useVModel(props, 'modelValue', emit)

const smallPriceWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return getPriceWithDiscount(props.drink., props.drink.discount)
})

const bigPriceWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return getPriceWithDiscount(props.drink.price.big, props.drink.discount)
})

function close() {
  emit('update:modelValue', false)
}
</script>

<style lang="scss" src="./DrinkModal.scss"></style>
