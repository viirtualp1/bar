import { collection, getDocs, query } from 'firebase/firestore'

export function getSnacks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'snacks')))
}

export function getKitchenFood() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'food')))
}
