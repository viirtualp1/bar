<template>
  <v-dialog
    class="snack-modal"
    v-model="currentValue"
    :fullscreen="$vuetify.display.smAndDown"
  >
    <v-card class="snack-modal__card">
      <v-card-title class="snack-modal__header">
        {{ snack.name }}
        <v-spacer />

        <v-btn class="snack-modal__close" size="x-small" icon @click="close">
          <v-icon size="x-small">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div class="mb-4">{{ snack.description }}</div>

        <div class="snack-modal__tags">
          <div>
            <v-chip color="info" v-for="shop in snack.location">
              Бар {{ shop }}
            </v-chip>
          </div>

          <images-slider :photos="snack.images" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SnackData } from '@/types/product'
import ImagesSlider from '@/components/ImagesSlider/ImagesSlider.vue'

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
  () => (currentValue.value = props.value),
)

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./SnackModal.scss"></style>
