import { SnackCreateData, SnackData } from '@/types/product'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'

export function getSnacks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'snacks')))
}

export function getSnack(id: number) {}

export function createSnack(data: SnackCreateData) {
  const { $db } = useNuxtApp()

  return addDoc(collection($db, 'snacks'), data)
}

export function updateSnack(data: SnackData) {}

export function deleteSnack(id: number) {}
