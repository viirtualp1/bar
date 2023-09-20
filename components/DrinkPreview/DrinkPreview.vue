<template>
  <div v-if="drink" class="drink-preview">
    <div class="drink-preview__header">
      <h2>{{ drink.name }}</h2>

      <v-chip color="success" class="drink-preview__price" size="2">
        {{ drink.price }} ₽
      </v-chip>
    </div>

    <div class="drink-preview__description">{{ drink.description }}</div>

    <div v-if="drink.images.length > 0">
      <v-img :src="drink.images[0]" cover />
    </div>

    <v-chip
      class="ml-0 mt-4 font-weight-bold"
      color="info"
      size="2"
      v-for="(shop, idx) in drink.location"
      :key="idx"
    >
      Бар {{ shop }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { DrinkData } from '@/types/product'

defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})
</script>

<style lang="scss" src="./DrinkPreview.scss"></style>
