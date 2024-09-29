<template>
  <div class="dashboard">
    <heartbeats-list @set-alert="setAlert" @action-alert="actionAlert" />
  </div>
</template>

<script setup lang="ts">
  import HeartbeatsList from '../../../components/alerts/HeartbeatsList.vue'
  import { useRouter } from 'vue-router'
  // import { useAlertStore } from '../../../stores/alert-store'
  import { useHeartbeatStore } from '../../../stores/heartbeat-store'
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'

  const { environments, envSelected } = storeToRefs(useHeartbeatStore())
  const router = useRouter()

  const setAlert = (item: any) => {
    router.push({ name: 'alert', params: { id: item } })
  }

  const actionAlert = (action: string, id: string) => {
    console.log('ACTION ALERT: ' + action + ' ' + id)
  }

  const refreshHeartbeats = () => {
    useHeartbeatStore().fetchHeartbeats()
  }

  onMounted(() => {
    // useAlertStore().fetchEnvMeta()
    useHeartbeatStore().fetchHeartbeats()
    refreshHeartbeats()
    setInterval(refreshHeartbeats, 10000)
  })
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

  .card-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .env-filter-card {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    text-transform: uppercase;
  }

  .env-filter-card:hover {
    background-color: #625f5f;
    color: whitesmoke;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    text-transform: uppercase;
  }

  .env-selected {
    background-color: rgb(21, 78, 193);
    color: whitesmoke;
  }
</style>
