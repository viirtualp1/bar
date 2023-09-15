<template>
  <v-dialog
    class="drink-modal"
    v-model="currentValue"
    :fullscreen="$vuetify.display.smAndDown"
  >
    <v-card class="drink-modal__card">
      <v-card-title class="drink-modal__header">
        {{ drink.name }}
        <v-spacer />

        <v-btn class="drink-modal__close" size="x-small" icon @click="close">
          <v-icon size="x-small">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div class="mb-4">{{ drink.description }}</div>

        <div class="drink-modal__tags">
          <v-chip color="error" class="mb-3">
            Крепкость {{ drink.strength }}
          </v-chip>
          <v-chip color="success" class="mb-2">
            Плотность {{ drink.density }}
          </v-chip>

          <div>
            <v-chip color="info" v-for="shop in drink.location">
              Бар {{ shop }}
            </v-chip>
          </div>

          <images-slider :photos="drink.images" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { DrinkData } from '@/types/product'
import ImagesSlider from '@/components/ImagesSlider/ImagesSlider.vue'

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

const swiperRef = ref()

const currentValue = ref(false)

watch(
  () => props.value,
  () => (currentValue.value = props.value),
)

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./DrinkModal.scss"></style>
