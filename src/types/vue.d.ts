// src/types/vue.d.ts

import { ComponentCustomProperties } from 'vue'
import dayjs from 'dayjs'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs
    // $config: {}
    // {
    //   endpoint: string
    //   api_token: string
    //   Add other config properties if necessary
    // }
  }
}
