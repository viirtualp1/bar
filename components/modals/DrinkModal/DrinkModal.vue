<template>
  <product-modal v-model="currentValue">
    <v-card class="drink-modal__card">
      <product-title @close="close">
        {{ drink.name }}
      </product-title>

      <v-card-text>
        <div v-if="!drink.inStock" class="drink-card__price">Нет в наличии</div>
        <div v-else-if="!drink.priceBigSize" class="drink-card__price">
          {{ drink.priceLittleSize }} ₽
        </div>

        <div class="drink-modal__description">{{ drink.description }}</div>

        <div
          class="drink-modal__discount"
          v-if="drink.inStock && drink.discount && drink.priceLittleSize"
        >
          <div class="drink-modal__discount-with drink-card__price">
            {{ priceLittleWithDiscount }}
          </div>

          <div class="drink-modal__discount-without">
            {{ drink.priceLittleSize }} ₽
          </div>

          <span class="drink-modal__size">за 0,33</span>
        </div>

        <div
          class="drink-modal__discount"
          v-if="drink.discount && drink.priceBigSize"
        >
          <div class="drink-modal__discount-with drink-card__price">
            {{ priceBigWithDiscount }}
          </div>

          <div class="drink-modal__discount-without">
            {{ drink.priceBigSize }} ₽
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
import { DrinkData } from '@/types/product'
import { getPriceWithDiscount } from '@/services/drink'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const emit = defineEmits({
  close: () => undefined,
})

const currentValue = ref(false)

const nuxt = useNuxtApp()

watch(
  () => props.value,
  () => (currentValue.value = props.value),
)

const priceLittleWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return getPriceWithDiscount(props.drink.priceLittleSize, props.drink.discount)
})

const priceBigWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return getPriceWithDiscount(props.drink.priceBigSize, props.drink.discount)
})

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./DrinkModal.scss"></style>
