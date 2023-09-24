import { collection, getDocs, query } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'

export function getSnacks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'snacks')))
}

export function getKitchenFood() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'food')))
}

export function getDiscountProducts() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'discount')))
}

export function getServices() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'services')))
}

export function getSnackImage(id: string, fileName: string) {
  const { $storage: storage } = useNuxtApp()

  return getDownloadURL(ref(storage, `snacks/${id}/${fileName}`))
}
