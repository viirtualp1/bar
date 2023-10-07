<template>
  <v-card class="snack-card" @click="openSnackModal">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      v-if="snack.images.length > 0"
      :src="snack.images[0]"
      height="250"
      cover
    />

    <template #title>
      <v-card-title class="snack-card__title">
        {{ snack.name }}

        <v-icon
          v-if="snack.discount"
          color="error"
          icon="mdi-fire-circle"
          size="small"
        />
      </v-card-title>
    </template>

    <v-card-text>
      <div v-if="!snack.inStock" class="snack-card__price">Нет в наличии</div>
      <div class="snack-card__price" v-else>{{ snack.price }} ₽</div>

      <div class="snack-card__description">
        {{ snack.description }}
      </div>

      <div class="snack-card__locations">
        <v-chip
          v-for="location in snack.locations"
          class="snack-card__location"
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

      <snack-modal
        v-model="isSnackModalOpen"
        :snack="snack"
        @close="closeSnackModal"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { SnackData } from '@/types/product'
import { locations } from '@/services/drink'

import useSnackModal from '@/components/modals/SnackModal/useSnackModal'
import SnackModal from '@/components/modals/SnackModal/SnackModal.vue'

defineProps({
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})

const { isSnackModalOpen, openSnackModal, closeSnackModal } = useSnackModal()

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]
</script>

<style lang="scss" src="./SnackCard.scss"></style>
