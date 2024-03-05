import { type SnackData } from '@/types/product'

export default function useFilteredSnacks(snacks: Ref<SnackData[]>) {
  const kitchenSnacks = computed(() => {
    return snacks.value.filter((snack) => snack.types.includes('kitchen'))
  })

  return {
    kitchenSnacks,
  }
}
