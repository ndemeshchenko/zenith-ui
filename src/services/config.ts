import Axios, { AxiosInstance } from 'axios'

class Config {
  private config: any = {}
  private envConfig: any = {}
  private localConfig: any = {}
  private remoteConfig: any = {}

  private $http: AxiosInstance

  constructor() {
    this.$http = Axios.create()
  }

  public static API_URL = 'http://localhost:8080'

  getConfig(): Promise<any> {
    return (
      this.getEnvConfig()
        .then((response) => {
          return this.setEnvConfig(response)
        })
        // TODO - add remote config
        // .then(response => {
        //   const endpoint = this.config.endpoint ? this.config.endpoint : 'http://localhost:8080'
        //   return this.getRemoteConfig(endpoint)
        // })
        .catch((error: any) => {
          console.log(error)
          throw error
        })
    )
  }

  getEnvConfig() {
    return new Promise((resolve, reject) => {
      const envConfig = {
        endpoint: '',
        api_token: '',
        client_id: '',
        tracking_id: '',
      }

      if (import.meta.env['VITE_ZENITH_ENDPOINT']) {
        envConfig['endpoint'] = import.meta.env['VITE_ZENITH_ENDPOINT']
      }

      if (import.meta.env['VITE_ZENITH_API_TOKEN']) {
        envConfig['api_token'] = import.meta.env['VITE_ZENITH_API_TOKEN']
      }
      // if (process.env.VUE_APP_CLIENT_ID) {
      //   envConfig['client_id'] = process.env.VUE_APP_CLIENT_ID
      // }
      // if (process.env.VUE_APP_TRACKING_ID) {
      //   envConfig['tracking_id'] = process.env.VUE_APP_TRACKING_ID
      // }
      resolve(envConfig)
    })
  }

  setEnvConfig(data: any) {
    this.envConfig = data
    return this.mergeConfig()
  }

  mergeConfig() {
    return (this.config = {
      ...this.remoteConfig,
      ...this.localConfig,
      ...this.envConfig,
    })
  }
}

export default new Config()
