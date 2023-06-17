<template>
  <div class="dashboard">
    <alerts-list @setAlert="setAlert" @actionAlert="actionAlert" />
  </div>
</template>

<script setup lang="ts">

  import AlertsList from '../../../components/alerts/AlertsList.vue'
  import { useRouter } from "vue-router";

  import { useAlertStore } from '../../../stores/alert-store'
  import { onMounted } from 'vue'

  const router = useRouter()

  const setAlert = (item: any) => {
    router.push({ name: 'alert', params: { id: item } })
  }

  const actionAlert = (action: string, id: string) => {
    console.log('ACTION ALERT: ' + action + ' ' + id)
    useAlertStore().actionAlert(action, id).then(() => {
      useAlertStore().fetchAlerts()
    })
  }

  const refreshAlerts = () => {
    useAlertStore().fetchAlerts()
  }


  onMounted(() => {
    refreshAlerts()
    setInterval(refreshAlerts, 10000)
  })



  // const dashboardMap = ref()

  // function addAddressToMap({ city, country }: { city: { text: string }; country: string }) {
  //   dashboardMap.value.addAddress({ city: city.text, country })
  // }
</script>

<style lang="scss">
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }

  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
      &__title {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
