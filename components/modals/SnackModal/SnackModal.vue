<template>
  <product-modal v-model="currentValue">
    <v-card class="snack-modal__card">
      <product-title>
        {{ snack.name }}
      </product-title>

      <v-card-text>
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
import { SnackData } from '@/types/product'
import { locations } from '@/services/drink'

import ProductModal from '@/components/Product/ProductModal/ProductModal.vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})

const emit = defineEmits({
  close: () => undefined,
})

const currentValue = ref(false)

watch(
  () => props.value,
  () => {
    emit('close')
    currentValue.value = props.value
  },
)

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]
</script>

<style lang="scss" src="./SnackModal.scss"></style>
