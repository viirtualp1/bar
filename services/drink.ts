import { DrinkData } from '@/types/product'

export function getDrinks(): Promise<DrinkData[]> {
  const runtimeConfig = useRuntimeConfig()

  return $fetch(`${runtimeConfig.public.apiBase}/drinks`)
}
