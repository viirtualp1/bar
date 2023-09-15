<template>
  <v-card class="drink-card mx-auto" @click="openDrinkModal">
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
      <div class="text-subtitle-1 mt-3">
        {{ drink.description }}
      </div>

      <div class="text-subtitle-2 font-weight-bold">{{ drink.price }} ₽</div>

      <div class="mt-2">
        <v-chip class="mr-2" color="error">
          Крепкость {{ drink.strength }}
        </v-chip>
        <v-chip color="success"> Плотность {{ drink.density }} </v-chip>
      </div>

      <v-chip
        v-for="location in drink.location"
        class="drink-card__location mr-2"
        color="info"
        text-color="white"
      >
        <v-icon icon="mdi-glass-mug-variant" class="mr-1"></v-icon>
        {{ getLocation(location) }}
      </v-chip>
    </v-card-text>

    <drink-modal
      v-model="isDrinkModalOpen"
      :drink="drink"
      @close="closeDrinkModal"
    />
  </v-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useRouter } from '#app'
import { DrinkData } from '~/types/product'
import { locations } from '~/services/drink'
import DrinkModal from '@/components/modals/DrinkModal/DrinkModal.vue'
import useDrinkModal from '@/components/modals/DrinkModal/useDrinkModal'

const props = defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const router = useRouter()

const { isDrinkModalOpen, openDrinkModal, closeDrinkModal } = useDrinkModal()

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]
</script>

<style lang="scss" src="./DrinkCard.scss"></style>
