import { createApp } from 'vue'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'
import { createGtm } from '@gtm-support/vue-gtm'

import dayjs from 'dayjs'

import stores from './stores'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import bootstrap from './services/config'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)


bootstrap.getConfig().then((config) => {
  app.use(stores)
  app.use(router)
  app.use(i18n)
  app.use(createVuestic({ config: vuesticGlobalConfig }))

  app.config.globalProperties.$config = config
  axios.defaults.baseURL = config.endpoint
  axios.defaults.headers.common['Authorization'] = `Bearer ${config.api_token}`;

  app.config.globalProperties.$dayjs = dayjs

  if (import.meta.env.VITE_APP_GTM_ENABLED) {
    app.use(
      createGtm({
        id: import.meta.env.VITE_APP_GTM_KEY,
        debug: false,
        vueRouter: router,
      }),
    )
  }

  app.mount('#app')
})


