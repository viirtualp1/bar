import { addDoc, collection, query, getDocs } from 'firebase/firestore'
import { DrinkCreateData, DrinkData } from '@/types/product'

export function getDrinks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'drinks')))
}

export function getDrink(id: number): {}

export function createDrink(data: DrinkCreateData) {
  const { $db: db } = useNuxtApp()

  return addDoc(collection(db, 'drinks'), data)
}

export function updateDrink(data: DrinkData) {}

export function deleteDrink(id: number) {}

export const locations = {
  1: 'Бар 1',
  2: 'Бар 2',
  3: 'Бар 3',
}
