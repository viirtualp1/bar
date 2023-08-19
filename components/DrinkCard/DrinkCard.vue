<template>
  <v-card class="mx-auto" max-width="374">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img :cover="true" height="250" :src="drink.image" />

    <v-rating
      class="ml-4 mt-2"
      :model-value="drink.strength"
      color="amber"
      density="compact"
      half-increments
      readonly
      size="small"
    ></v-rating>

    <v-card-item class="mb-0 pt-0">
      <v-card-title>
        {{ drink.name }}

        <v-icon color="error" icon="mdi-fire-circle" size="small" />
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="text-subtitle-1 font-weight-bold">{{ drink.price }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { DrinkData } from '@/types/product'

defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})
</script>

<style lang="scss" src="./DrinkCard.scss"></style>
