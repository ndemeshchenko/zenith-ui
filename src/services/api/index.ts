// import Vue from 'vue'

import axios from 'axios'
import { AxiosRequestConfig, Method } from 'axios'

const api = {
  get(url: string, config?: AxiosRequestConfig) {
    return this.request('GET', url, null, config)
  },
  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request('PATCH', url, data, config)
  },
  delete(url: string, config?: AxiosRequestConfig) {
    return this.request('DELETE', url, null, config)
  },
  request(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    // const t0 = performance.now()
    return axios.request({ ...config, url, method, data }).then((response) => {
      // const t1 = performance.now()
      //   Vue.prototype.$track('timing_complete', {
      //     name: method,
      //     event_category: 'API',
      //     event_label: url,
      //     value: Math.round(t1 - t0)
      //   })
      return response.data
    })
  },
}

export default api
