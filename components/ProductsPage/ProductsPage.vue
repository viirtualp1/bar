<template>
  <v-container>
    <v-alert type="info" v-if="isLoading">Loading...</v-alert>
    <v-row>
      <v-col v-for="drink in drinks" :key="drink.id">
        <drink-card :drink="drink" />
      </v-col>
      <v-col v-for="snack in snacks" :key="snack.id">
        <snack-card :snack="snack" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getDrinks } from '@/services/drink'
import { getSnacks } from '@/services/snack'

import { DrinkData, SnackData } from '@/types/product'

import DrinkCard from '@/components/DrinkCard/DrinkCard.vue'
import SnackCard from '@/components/SnackCard/SnackCard.vue'

const isLoading = ref(false)

const drinks = ref<DrinkData[]>([])
const snacks = ref<SnackData[]>([])

async function fetchData() {
  isLoading.value = true

  try {
    drinks.value = await getDrinks()
    snacks.value = await getSnacks()
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => await fetchData())
</script>

<style lang="scss" src="./ProductsPage.scss"></style>
