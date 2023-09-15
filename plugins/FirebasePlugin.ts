import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

export default defineNuxtPlugin(() => {
  const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  } = useAppConfig()

  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  }

  // @ts-ignore
  const app = initializeApp(firebaseConfig)

  const db = getFirestore(app)
  const analytics = getAnalytics(app)

  return {
    provide: {
      app,
      db,
      analytics,
    },
  }
})
