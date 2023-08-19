import { SnackData } from '~/types/product'

export function getSnacks(): Promise<SnackData[]> {
  const runtimeConfig = useRuntimeConfig()

  return $fetch(`${runtimeConfig.public.apiBase}/snacks`)
}
