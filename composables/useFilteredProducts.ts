import { Ref } from 'vue'
import { SnackData, DrinkData } from '@/types/product'

export default function useFilteredProducts(
  drinks: Ref<DrinkData[]>,
  snacks: Ref<SnackData[]>,
) {
  const products = computed(() => [...drinks.value, ...snacks.value])

  const discountProducts = computed(() => {
    return products.value.filter((product) => {
      return Boolean(product.discount)
    })
  })

  return {
    discountProducts,
  }
}
