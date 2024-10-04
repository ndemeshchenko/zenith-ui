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

      if (window._env_ && window._env_['VITE_ZENITH_ENDPOINT']) {
        envConfig['endpoint'] = window._env_['VITE_ZENITH_ENDPOINT']
      } else if (import.meta.env['VITE_ZENITH_ENDPOINT']) {
        envConfig['endpoint'] = import.meta.env['VITE_ZENITH_ENDPOINT']
      } else {
        reject('No endpoint provided via VITE_ZENITH_ENDPOINT')
      }

      if (window._env_ && window._env_['VITE_ZENITH_API_TOKEN']) {
        envConfig['api_token'] = window._env_['VITE_ZENITH_API_TOKEN']
      } else if (import.meta.env['VITE_ZENITH_API_TOKEN']) {
        envConfig['api_token'] = import.meta.env['VITE_ZENITH_API_TOKEN']
      } else {
        reject('No API token provided via VITE_ZENITH_API_TOKEN')
      }

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
