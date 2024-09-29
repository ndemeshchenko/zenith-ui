import { defineStore } from 'pinia'
import AlertsApi from '../services/api/alert.service'

interface Heartbeat {
  ID: string
  Environment: string
  Cluster: string
  Status: string
  Text: string
  LastReceivedAt: string
  HasAlerts: boolean
}

export const useHeartbeatStore = defineStore('alert', {
  state: () => {
    return {
      heartbeats: [] as Heartbeat[],
      environments: [],
      loading: false,
      error: null as Error | null,
      envSelected: null as string | null, // Add envSelected to the state
    }
  },

  actions: {
    // makeFilter() {
    //   console.log("makeFilter", this.envSelected)
    //   if (this.envSelected) {
    //     this.alertsFilter = { ...this.alertsFilter, environment: this.envSelected }
    //   } else {
    //     this.alertsFilter = {}
    //   }
    // },

    fetchHeartbeats: async function () {
      this.loading = true
      try {
        console.log('fetchHeartbeats')
        const data = await AlertsApi.getHeartbeats({})

        this.heartbeats = data.map((hb: any) => ({
          ...hb,
          HasAlerts: hb.Status === 'Offline',
        }))
      } catch (error) {
        if (error instanceof Error) {
          this.error = error
        } else {
          this.error = new Error(String(error))
        }
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async fetchEnvMeta() {
      this.loading = true
      try {
        this.environments = await AlertsApi.getEnvs({})
      } catch (error) {
        if (error instanceof Error) {
          this.error = error
        } else {
          this.error = new Error(String(error))
        }
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    // async fetchAlert(id: string) {
    //   this.loading = true
    //   try {
    //     console.log(id)
    //     this.alert = await AlertsApi.getAlert(id)
    //   } catch (error) {
    //     // this.error = error
    //     console.log(error)
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async actionAlert(id: string, action: string) {
    //   this.loading = true
    //   try {
    //     console.log("actionAlert", id, action)
    //     this.alert = await AlertsApi.actionAlert(id, action)
    //   } catch (error) {
    //     // this.error = error
    //     console.log(error)
    //   } finally {
    //     this.loading = false
    //   }
    // }
  },
})
