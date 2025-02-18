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
        <template v-for="drink in showedDrinks" :key="drink.id">
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

        <template v-for="drink in bottle" :key="drink.id">
          <v-col v-if="currentTab === 3 && drink.name" cols="12" md="4">
            <drink-card :drink="drink" bottle />
          </v-col>
        </template>

        <template v-for="drink in boules" :key="drink.id">
          <v-col v-if="currentTab === 4 && drink.name" cols="12" md="4">
            <drink-card :drink="drink" boules />
          </v-col>
        </template>

        <template v-for="snack in snacks" :key="snack.id">
          <v-col v-if="currentTab === 5 && snack.name" cols="12" md="4">
            <snack-card :snack="snack" />
          </v-col>
        </template>

        <template v-for="food in kitchenFood" :key="food.id">
          <v-col v-if="currentTab === 6 && food.name" cols="12" md="4">
            <snack-card :snack="food" food />
          </v-col>
        </template>

        <template v-for="product in discountProducts" :key="product.id">
          <v-col v-if="currentTab === 7 && product" cols="12" md="4">
            <snack-card :snack="product" discount />
          </v-col>
        </template>

        <template v-for="service in services" :key="service.id">
          <v-col v-if="currentTab === 8 && service" cols="12" md="4">
            <snack-card :snack="service" service />
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

          Безалк напитки
        </v-btn>

        <v-btn>
          <v-icon>mdi-bottle-tonic</v-icon>

          Бутылочное пиво
        </v-btn>

        <v-btn>
          <v-icon>mdi-bottle-soda-classic</v-icon>

          Були
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

        <v-btn>
          <v-icon>mdi-room-service</v-icon>

          Услуги
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-container>
</template>

<script setup lang="ts">
import {
  getDrinks,
  getDrinkImage,
  getBottle,
  getBoules,
} from '@/services/drink'
import {
  getKitchenFood,
  getSnacks,
  getSnackImage,
  getDiscountProducts,
  getServices,
} from '@/services/snack'

import { DrinkData, SnackData } from '@/types/product'

import useFilteredDrinks from '@/composables/useFilteredDrinks'

import DrinkCard from '@/components/Drink/DrinkCard/DrinkCard.vue'
import SnackCard from '@/components/Snack/SnackCard/SnackCard.vue'

const isLoading = ref(false)
const currentTab = ref(0)

const drinks = ref<DrinkData[]>([])
const bottle = ref<DrinkData[]>([])
const boules = ref<DrinkData[]>([])
const snacks = ref<SnackData[]>([])
const kitchenFood = ref<SnackData[]>([])
const discountProducts = ref<SnackData[]>([])
const services = ref<SnackData[]>([])

const { nonAlcoholicDrinks, draftDrinks, boulesDrinks, bottleDrinks } =
  useFilteredDrinks(drinks)

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

    // @ts-ignore
    discountProducts.value = await getDiscountProducts()
    formatDiscountProducts()

    // @ts-ignore
    services.value = await getServices()
    formatServices()

    // @ts-ignore
    boules.value = await getBoules()
    formatBoulesDrinks()

    // @ts-ignore
    bottle.value = await getBottle()
    formatBottleDrinks()
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const showedDrinks = computed(() => {
  return drinks.value.filter((drink) => {
    return (
      !drink.types.includes('draft') &&
      !drink.types.includes('non-alcoholic') &&
      !drink.types.includes('boules') &&
      !drink.types.includes('bottle')
    )
  })
})

function formatDrinks() {
  drinks.value = (drinks.value as any).docs.map((doc: any) => {
    return doc.data()
  })

  const drinksNew = drinks.value.map(async (drink) => {
    let images: string[] = []

    for (const image of drink.images) {
      try {
        let imageUrl = await getDrinkImage(drink.id, image)
        images.push(imageUrl)
      } catch (err) {
        images.push(image)
        console.error(err)
      }
    }

    return {
      ...drink,
      images,
    }
  })

  drinks.value = []
  drinksNew.forEach(async (drinkNew) => {
    drinkNew.then((res) => {
      drinks.value.push(res)
    })
  })
}

function formatSnacks() {
  snacks.value = (snacks.value as any).docs.map((doc: any) => {
    return doc.data()
  })

  const snacksNew = snacks.value.map(async (snack) => {
    let images: string[] = []

    for (const image of snack.images) {
      try {
        let imageUrl = await getSnackImage(snack.id, image)
        images.push(imageUrl)
      } catch (err) {
        images.push(image)

        console.error(err)
      }
    }

    return {
      ...snack,
      images,
    }
  })

  snacks.value = []
  snacksNew.forEach(async (snackNew) => {
    snackNew.then((res) => {
      snacks.value.push(res)
    })
  })
}

function formatKitchenFoods() {
  kitchenFood.value = (kitchenFood.value as any).docs.map((doc: any) => {
    return doc.data()
  })

  const kitchenFoodNew = kitchenFood.value.map(async (food) => {
    let images: string[] = []

    for (const image of food.images) {
      try {
        let imageUrl = await getSnackImage(food.id, image)
        images.push(imageUrl)
      } catch (err) {
        images.push(image)

        console.error(err)
      }
    }

    return {
      ...food,
      images,
    }
  })

  kitchenFood.value = []
  kitchenFoodNew.forEach(async (foodNew) => {
    foodNew.then((res) => {
      kitchenFood.value.push(res)
    })
  })
}

function formatDiscountProducts() {
  discountProducts.value = (discountProducts.value as any).docs.map(
    (doc: any) => {
      return doc.data()
    },
  )

  const productsNew = discountProducts.value.map(async (product) => {
    let images: string[] = []

    for (const image of product.images) {
      try {
        let imageUrl = await getSnackImage(product.id, image)
        images.push(imageUrl)
      } catch (err) {
        images.push(image)
        console.error(err)
      }
    }

    return {
      ...product,
      images,
    }
  })

  discountProducts.value = []
  productsNew.forEach(async (productNew) => {
    productNew.then((res) => {
      discountProducts.value.push(res)
    })
  })
}

function formatServices() {
  services.value = (services.value as any).docs.map((doc: any) => {
    return doc.data()
  })

  const servicesNew = services.value.map(async (service) => {
    let images: string[] = []

    for (const image of service.images) {
      try {
        let imageUrl = await getSnackImage(service.id, image)
        images.push(imageUrl)
      } catch (err) {
        images.push(image)
        console.error(err)
      }
    }

    return {
      ...service,
      images,
    }
  })

  services.value = []
  servicesNew.forEach(async (serviceNew) => {
    serviceNew.then((res) => {
      services.value.push(res)
    })
  })
}

function formatBottleDrinks() {
  bottle.value = (bottle.value as any).docs.map((doc: any) => {
    return doc.data()
  })

  const bottleDrinksNew = bottle.value.map(async (bottleDrink) => {
    let images: string[] = []

    for (const image of bottleDrink.images) {
      try {
        let imageUrl = await getDrinkImage(bottleDrink.id, image)
        images.push(imageUrl)
      } catch (err) {
        images.push(image)
        console.error(err)
      }
    }

    return {
      ...bottleDrink,
      images,
    }
  })

  bottle.value = [...bottleDrinks.value]
  bottleDrinksNew.forEach(async (bottleDrinkNew) => {
    bottleDrinkNew.then((res) => {
      bottle.value.push(res)
    })
  })
}

function formatBoulesDrinks() {
  boules.value = (boules.value as any).docs.map((doc: any) => {
    return doc.data()
  })

  const boulesDrinksNew = boules.value.map(async (boulesDrink) => {
    let images: string[] = []

    for (const image of boulesDrink.images) {
      try {
        let imageUrl = await getDrinkImage(boulesDrink.id, image)
        images.push(imageUrl)
      } catch (err) {
        images.push(image)
        console.error(err)
      }
    }

    return {
      ...boulesDrink,
      images,
    }
  })

  boules.value = [...boulesDrinks.value]
  boulesDrinksNew.forEach(async (boulesDrinkNew) => {
    boulesDrinkNew.then((res) => {
      boules.value.push(res)
    })
  })
}

onMounted(async () => await fetchData())
</script>
