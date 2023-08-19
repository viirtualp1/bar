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

    <v-img :cover="true" height="250" :src="snack.image" />

    <v-card-item class="mb-0 pt-0">
      <v-card-title>
        {{ snack.name }}

        <v-icon color="error" icon="mdi-fire-circle" size="small" />
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="text-subtitle-1 font-weight-bold">{{ snack.price }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SnackData } from '@/types/product'

defineProps({
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})
</script>

<style lang="scss" src="./SnackCard.scss"></style>
