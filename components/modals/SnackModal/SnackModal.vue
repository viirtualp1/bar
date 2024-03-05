<template>
  <product-modal v-model="currentValue">
    <v-card class="snack-modal__card">
      <product-title>
        {{ snack.name }}
      </product-title>

      <v-card-text>
        <div v-if="!snack.inStock" class="snack-modal__price">
          Нет в наличии
        </div>
        <div v-else class="snack-modal__price">{{ snack.price }} ₽</div>

        <div class="mb-4">{{ snack.description }}</div>

        <div class="snack-modal__locations">
          <v-chip
            v-for="location in snack.locations"
            class="snack-modal__location"
            color="teal"
            text-color="white"
          >
            <v-icon
              v-if="location === 0"
              icon="mdi-glass-mug-variant"
              class="mr-1"
            />
            <v-icon v-if="location === 1" icon="mdi-car-back" class="mr-1" />

            {{ getLocation(location) }}
          </v-chip>
        </div>

        <images-slider v-if="snack.images.length > 0" :photos="snack.images" />
      </v-card-text>
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import { getLocation } from '@/services/product'
import type { SnackData } from '@/types/product'

import { ProductTitle, ProductModal } from '@/components/Product'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})

const emit = defineEmits({
  'update:modelValue': () => true,
})

const currentValue = useVModel(props, 'modelValue', emit)
</script>

<style lang="scss" src="./SnackModal.scss"></style>
