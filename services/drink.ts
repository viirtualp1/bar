import { collection, query, getDocs } from 'firebase/firestore'

export function getDrinks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'drinks')))
}

export const locations = {
  1: 'Бар 1',
  2: 'Бар 2',
  3: 'Бар 3',
}

export const types = {
  draft: 'Разливное пиво',
  banned: 'Баночное пиво',
  butter: 'Сливочное пиво',
  'non-alcoholic': 'Безалкогольное пиво',
}

export function getPriceWithDiscount(price: number, discount: number) {
  return price - price * (discount / 100)
}
