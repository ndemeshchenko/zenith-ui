<template>
  <div class="markup-tables flex">
    <va-card class="flex mb-4">
      <va-card-title>Heartbeats monitors</va-card-title>
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table va-table--hoverable">
            <thead>
              <tr>
                <th>Status</th>
                <th>Environment</th>
                <th>Cluster</th>
                <th>Last Received At</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="hb in heartbeats" :key="hb.ID" @click="selectItem(hb.ID)" v-if="heartbeats.length > 0">
                <td>
                  <mark :class="hb.HasAlerts ? 'alert-severity alert-severity-critical' : 'alert-severity alert-severity-ok' ">
                    {{ hb.HasAlerts ? 'Offline' : 'Online' }}
                  </mark>
                </td>
                <td>{{ hb.Environment }}</td>
<!--                <td>-->
<!--                  <span class="badge badge-pill badge-dup">{{ alert.DuplicateCount }}</span>-->
<!--                </td>-->
                <td>{{ hb.Cluster }}</td>
                <td class="nowrap">
<!--                  <div>{{ hb.LastReceivedAt }}</div>-->
                  <div :title="hb.LastReceivedAt">{{ formatTimeDifference(hb.LastReceivedAt) }}</div>
                </td>
                <td>🔹 heartbeat monitor for cluster {{hb.Environment}}-{{hb.Cluster}}</td>
                <td>
                  <div class="actions align-right">
                    <div class="action-buttons">
                      <a href="#" @click.stop.prevent="ackAlert(hb.ID)">ACK</a>&nbsp;
                      <a href="#" @click.stop.prevent="resolveAlert(hb.ID)">RESOLVE</a>&nbsp;
                      <a href="#" @click.stop.prevent="deleteAlert(hb.ID)">DELETE</a>
                    </div>
                  </div>
                  {{ hb.Text }}
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
  // import { useAlertStore } from '../../stores/alert-store'
  import {useHeartbeatStore} from "../../stores/heartbeat-store";
  import { formatDistanceToNow } from 'date-fns'

  const { heartbeats } = storeToRefs(useHeartbeatStore())

  const emit = defineEmits(['set-alert'])

  const selectItem = (id: string) => {
    emit('set-alert', id)
  }

  // const ackAlert = (id: string) => {
  //   emit('action-alert', 'ackknowledge', id)
  // }

  // const resolveAlert = (id: string) => {
  //   emit('action-alert', 'resolve', id)
  // }

  const deleteAlert = (id: string) => {
    emit('action-alert', 'delete', id)
  }

  const formatTimeDifference = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
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

  .alert-severity-ok {
    background-color: #28a745;
    color: white;
  }

  .nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
