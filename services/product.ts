import { collection, getDocs, query } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'

interface ProductImagesData {
  path: string
  id: string
  name: string
}

export const availableLocations = [
  { name: 'Бар', icon: 'mdi-glass-mug-variant' },
  { name: 'Доставка', icon: 'mdi-car-back' },
] as const

export const DrinkCategories = {
  draft: 'Разливное пиво',
  banned: 'Баночное пиво',
  butter: 'Сливочное пиво',
  'non-alcoholic': 'Безалкогольные напитки',
  filtered: 'Фильтрованное',
  light: 'Светлое',
  dark: 'Темное',
  boules: 'Були',
  bottle: 'Бутылочное пиво',
}

export function getPriceWithDiscount(price: number, discount: number) {
  return price - price * (discount / 100)
}

export const getLocation = (location: number) =>
  availableLocations[location as keyof typeof availableLocations]

export function getProductData(path: string) {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, path)))
}

export function getProductImages(options: ProductImagesData) {
  const { $storage: storage } = useNuxtApp()
  const { path, id, name } = options

  return getDownloadURL(ref(storage, `${path}/${id}/${name}`))
}
