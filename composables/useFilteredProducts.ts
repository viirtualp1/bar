import type { SnackData, DrinkData } from '@/types/product'

export default function useFilteredProducts(
  drinks: Ref<DrinkData[]>,
  snacks: Ref<SnackData[]>,
) {
  const products = computed(() => [...drinks.value, ...snacks.value])

  const discountProducts = computed(() => {
    return products.value.filter((product) => Boolean(product.discount))
  })

  return {
    discountProducts,
  }
}
