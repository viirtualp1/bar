<template>
  <div class="drink-price">
    <div v-if="!inStock" class="drink-price__text">Нет в наличии</div>
    <div class="drink-price__discount" v-else-if="discount">
      <div class="drink-price__with drink-price__text">
        {{ priceWithDiscount }}
      </div>

      <div class="drink-price__without">{{ priceLittleSize }} ₽</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPriceWithDiscount } from '@/services/drink'

const props = defineProps({
  inStock: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  priceLittleSize: {
    type: Number,
    default: 0,
  },
})

const priceWithDiscount = computed(() => {
  if (!props.discount) {
    return 0
  }

  return getPriceWithDiscount(props.priceLittleSize, props.discount)
})
</script>

<style lang="scss" src="./DrinkPrice.scss"></style>
