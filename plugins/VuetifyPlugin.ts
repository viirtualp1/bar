import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VSkeletonLoader } from 'vuetify/labs/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    components: {
      ...components,
      VSkeletonLoader,
    },
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})
