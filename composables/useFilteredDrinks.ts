import { Ref } from 'vue'
import { DrinkData } from '@/types/product'

export default function useFilteredDrinks(drinks: Ref<DrinkData[]>) {
  const draftDrinks = computed(() => {
    return drinks.value.filter((drink) => {
      return drink.types.includes('draft')
    })
  })

  const nonAlcoholicDrinks = computed(() => {
    return drinks.value.filter((drink) => {
      return drink.types.includes('non-alcoholic')
    })
  })

  return { draftDrinks, nonAlcoholicDrinks }
}
