import { collection, query, getDocs } from 'firebase/firestore'

export function getDrinks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'drinks')))
}

export const locations = ['Бар', 'Доставка']

export const types = {
  draft: 'Разливное пиво',
  banned: 'Баночное пиво',
  butter: 'Сливочное пиво',
  'non-alcoholic': 'Безалкогольное пиво',
  filtered: 'Фильтрованное',
  light: 'Светлое',
  dark: 'Темное',
}

export function getPriceWithDiscount(price: number, discount: number) {
  return price - price * (discount / 100)
}
