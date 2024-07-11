import { defineStore } from "pinia";
import AlertsApi from '../services/api/alert.service'

class Alert {
  ID: string = "";
  Resource: string = "";
  Event: string = "";
  Environment: string = "";
  SeverityCode: string = "";
  SeverityName: string = "";
  Correlate: string = "";
  Status: string = "";
  Service: string = "";
  Group: string = "";
  Value: string = "";
  Text: string = "";
  Summary: string = "";
  Tags: string = "";
  Attributes: string = "";
  Origin: string = "";
  Type: string = "";
  FingerPrint: string = "";
  GeneratorURL: string = "";
  RunbookURL: string = "";
  CreateTime: string = "";
  TimeOut: string = "";
  RawData: string = "";
  DuplicateCount: string = "";
  Repeat: boolean = false;
  PreviousSeverity: string = "";
  TrendIndication: string = "";
  ReceiveTime: string = "";
  UpdateTime: string = "";
}



export const useAlertStore = defineStore("alert", {
  state: () => {
    return {
      alerts: Array<Alert>,
      heartbeats: Array<Alert>,
      environments: [],
      loading: false,
      alert: {
        type: "",
        message: "",
        show: false,
      },
      alertsFilter: {},
      envSelected: "",
      error: null,
    };
  },

  actions: {
    makeFilter() {
      console.log("makeFilter", this.envSelected)
      if (this.envSelected) {
        this.alertsFilter = { ...this.alertsFilter, environment: this.envSelected }
      } else {
        this.alertsFilter = {}
      }
    },

    fetchAlerts: async function () {
      this.loading = true
      try {
        console.log("fetchAlerts", this.alertsFilter)
        this.alerts = await AlertsApi.getAlerts(this.alertsFilter)
      } catch (error) {
        this.error = error
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    fetchHeartbeats: async function () {
      this.loading = true
      try {
        console.log("fetchHeartbeats")
        this.heartbeats = await AlertsApi.getHeartbeats(this.alertsFilter)
      } catch (error) {
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
        this.error = error
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async fetchAlert(id: string) {
      this.loading = true
      try {
        console.log(id)
        this.alert = await AlertsApi.getAlert(id)
      } catch (error) {
        // this.error = error
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async actionAlert(id: string, action: string) {
      this.loading = true
      try {
        console.log("actionAlert", id, action)
        this.alert = await AlertsApi.actionAlert(id, action)
      } catch (error) {
        // this.error = error
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
});
