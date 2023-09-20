import { collection, getDocs, query } from 'firebase/firestore'
import { getDownloadURL, listAll, ref } from 'firebase/storage'

export function getSnacks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'snacks')))
}

export function getKitchenFood() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'food')))
}

export function getSnackImage(id: string, fileName: string) {
  const { $storage: storage } = useNuxtApp()

  return getDownloadURL(ref(storage, `snacks/${id}/${fileName}`))
}

export function getFoodImage(id: string, fileName: string) {
  const { $storage: storage } = useNuxtApp()

  return listAll(ref(storage, `food/${id}/${fileName}`))
}
