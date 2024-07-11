import { defineStore } from "pinia";
import AlertsApi from '../services/api/alert.service'

class Heartbeat {
  // ID: string = "";
  Environment: string = "";
  Status: string = "";
  Text: string = "";
  LastReceivedAt: string = "";
}



export const useHeartbeatStore = defineStore("alert", {
  state: () => {
    return {
      heartbeats: Array<Heartbeat>,
      environments: [],
      loading: false,
      error: null,
    };
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
        console.log("fetchHeartbeats")
        this.heartbeats = await AlertsApi.getHeartbeats({})
      } catch (error) {
        // @ts-ignore
        this.error = error
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
        // @ts-ignore
        this.error = error
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
});
