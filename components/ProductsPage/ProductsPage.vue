<template>
  <v-container class="content">
    <v-row>
      <template v-if="isLoading">
        <v-col v-for="i in 3" :key="i" cols="12" md="4">
          <v-skeleton-loader
            class="mb-8"
            type="card"
            width="100%"
            height="150px"
          />
        </v-col>
      </template>

      <template v-else>
        <template v-for="drink in drinks" :key="drink.id">
          <v-col v-if="currentTab === 0 && drink.name" cols="12" md="4">
            <drink-card :drink="drink" />
          </v-col>
        </template>

        <template v-for="drink in draftDrinks" :key="drink.id">
          <v-col v-if="currentTab === 1 && drink.name" cols="12" md="4">
            <drink-card :drink="drink" />
          </v-col>
        </template>

        <template v-for="drink in nonAlcoholicDrinks" :key="drink.id">
          <v-col v-if="currentTab === 2 && drink.name" cols="12" md="4">
            <drink-card :drink="drink" />
          </v-col>
        </template>

        <template v-for="snack in snacks" :key="snack.id">
          <v-col v-if="currentTab === 3 && snack.name" cols="12" md="4">
            <snack-card :snack="snack" />
          </v-col>
        </template>

        <template v-for="snack in kitchenFood" :key="snack.id">
          <v-col v-if="currentTab === 4 && snack.name" cols="12" md="4">
            <snack-card :snack="snack" />
          </v-col>
        </template>

        <template v-for="product in discountProducts" :key="product.id">
          <v-col v-if="currentTab === 5 && product" cols="12" md="4">
            <drink-card
              v-if="product.type === ProductEnum.DRINK"
              :drink="product"
            />
            <snack-card v-else :snack="product" />
          </v-col>
        </template>
      </template>
    </v-row>

    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="currentTab" color="primary" horizontal>
        <v-btn>
          <v-icon>mdi-bottle-wine</v-icon>

          Пиво
        </v-btn>

        <v-btn>
          <v-icon>mdi-glass-mug</v-icon>

          Разливное
        </v-btn>

        <v-btn>
          <v-icon>mdi-beer</v-icon>

          Пиво безалк
        </v-btn>

        <v-btn>
          <v-icon>mdi-food</v-icon>

          Закуски
        </v-btn>

        <v-btn>
          <v-icon>mdi-fridge</v-icon>

          Кухня
        </v-btn>

        <v-btn>
          <v-icon>mdi-sale</v-icon>

          Скидки
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-container>
</template>

<script setup lang="ts">
import { getDrinks } from '@/services/drink'
import { getSnacks, getKitchenFood } from '@/services/snack'

import { DrinkData, ProductEnum, SnackData } from '@/types/product'

import useFilteredDrinks from '@/composables/useFilteredDrinks'
import useFilteredProducts from '@/composables/useFilteredProducts'

const isLoading = ref(false)
const currentTab = ref(0)

const drinks = ref<DrinkData[]>([])
const snacks = ref<SnackData[]>([])
const kitchenFood = ref<SnackData[]>([])

const { nonAlcoholicDrinks, draftDrinks } = useFilteredDrinks(drinks)
const { discountProducts } = useFilteredProducts(drinks, snacks)

async function fetchData() {
  isLoading.value = true

  try {
    // @ts-ignore
    drinks.value = await getDrinks()
    formatDrinks()

    // @ts-ignore
    snacks.value = await getSnacks()
    formatSnacks()

    // @ts-ignore
    kitchenFood.value = await getKitchenFood()
    formatKitchenFoods()
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function formatDrinks() {
  drinks.value = (drinks.value as any).docs.map((doc: any) => {
    return doc.data()
  })
}

function formatSnacks() {
  snacks.value = (snacks.value as any).docs.map((doc: any) => {
    return doc.data()
  })
}

function formatKitchenFoods() {
  kitchenFood.value = (kitchenFood.value as any).docs.map((doc: any) => {
    return doc.data()
  })
}

onMounted(async () => await fetchData())
</script>
