<template>
  <div class="grid row">
    <div class="flex xs12">
      <va-card class="fill-height" style="overflow-x: auto">
        <va-card-title>Environment filter</va-card-title>
        <va-card-content v-if="environments.length > 0" class="card-flex">
          <div
            v-for="env in environments"
            :key="env.Name"
            class="env-filter-card"
            :class="[envSelected == env.Name ? 'env-selected' : '']"
          >
            <span @click="selectEnv(env.Name)">{{ env.Name }} ({{ env.Count }})</span>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
  <div>&nbsp;</div>
  <p></p>

  <div class="dashboard">
    <alerts-list @setAlert="setAlert" @actionAlert="actionAlert" />
  </div>
</template>

<script setup lang="ts">
  import AlertsList from '../../../components/alerts/AlertsList.vue'
  import { useRouter } from 'vue-router'

  import { useAlertStore } from '../../../stores/alert-store'
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'

  const { environments, envSelected } = storeToRefs(useAlertStore())

  const router = useRouter()

  const setAlert = (item: any) => {
    router.push({ name: 'alert', params: { id: item } })
  }

  const selectEnv = (env: string) => {
    if (useAlertStore().envSelected === env) {
      useAlertStore().envSelected = ''
    } else {
      useAlertStore().envSelected = env
    }

    useAlertStore().makeFilter()
    useAlertStore().fetchAlerts()
  }

  const actionAlert = (action: string, id: string) => {
    console.log('ACTION ALERT: ' + action + ' ' + id)
    useAlertStore()
      .actionAlert(action, id)
      .then(() => {
        useAlertStore().fetchAlerts()
      })
  }

  const refreshAlerts = () => {
    useAlertStore().fetchAlerts()
  }

  onMounted(() => {
    useAlertStore().fetchEnvMeta()
    refreshAlerts()
    setInterval(refreshAlerts, 10000)
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
