<template>
  <div class="markup-tables flex">
    <va-card class="flex mb-4">
      <va-card-title>Alerts</va-card-title>
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table va-table--hoverable">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Event</th>
                <th>Environment</th>
                <th>Cluster</th>
                <th>Update Time</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody v-if="alerts.length > 0">
              <tr v-for="alert in alerts" :key="alert.ID" @click="selectItem(alert.ID)">
                <td>
                  <mark :class="'alert-severity alert-severity-' + alert.SeverityName">
                    {{ alert.SeverityName }}
                  </mark>
                </td>
                <td>{{ alert.Event }}</td>
                <td>{{ alert.Environment }}</td>
                <td class="nowrap">
                  <div>{{ alert.Cluster }}</div>
                </td>
                <td>{{ $dayjs(alert.UpdateTime).format('DD/MM/YYYY HH:MM') }}</td>
                <td>
                  <div class="actions align-right">
                    <div class="action-buttons">
                      <a href="#" @click.stop.prevent="ackAlert(alert.ID)">ACK</a>&nbsp;
                      <a href="#" @click.stop.prevent="resolveAlert(alert.ID)">RESOLVE</a>&nbsp;
                      <a href="#" @click.stop.prevent="deleteAlert(alert.ID)">DELETE</a>
                    </div>
                  </div>
                  {{ alert.Text }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useAlertStore } from '../../stores/alert-store'

  const { alerts } = storeToRefs(useAlertStore())

  const emit = defineEmits(['set-alert', 'action-alert'])
  // const emit = defineEmits<{
  //   setAlert: (id: string) => void
  //   actionAlert: (action: string, id: string) => void
  // }>()

  const selectItem = (id: string) => {
    emit('set-alert', id)
  }

  const ackAlert = (id: string) => {
    emit('action-alert', 'acknowledge', id)
  }

  const resolveAlert = (id: string) => {
    emit('action-alert', 'resolve', id)
  }

  const deleteAlert = (id: string) => {
    emit('action-alert', 'delete', id)
  }
</script>

<style>
  .align-right {
    position: relative;
  }

  .align-right > div {
    position: absolute;
    top: 0;
    right: 0;
  }

  .actions {
    display: none;
  }

  .action-buttons {
    background-color: #6c757d;
    font-weight: 900;
    color: white;
    padding: 0.2em 0.6em 0.3em;
  }

  .action-buttons a {
    color: white;
  }

  .action-buttons a:hover {
    color: rgb(190, 215, 243);
  }

  tr:hover .actions {
    display: block;
  }

  .badge-dup {
    background-color: #6c757d;
    color: beige;
    border-radius: 100%;
    padding: 0.2em 0.6em 0.3em;
    font-size: 14px;
  }

  .alert-severity {
    padding: 0.2em 0.6em 0.3em;
    font-weight: 600;
    line-height: 1;
    color: white;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    min-width: 65px;
  }

  .alert-severity-warning {
    background-color: #ffc107;
    color: black;
  }

  .alert-severity-critical {
    background-color: #dc3545;
    color: white;
  }

  .nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
