<template>
  <div v-if="alert" class="markup-tables flex">
    <va-card class="flex mb-4">
      <va-card-title>Alert Detail</va-card-title>
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table">
            <tbody>
              <tr>
                <td><b>Environment</b></td>
                <td>{{ alert.Environment }}</td>
              </tr>
              <tr>
                <td><b>Cluster</b></td>
                <td>{{ alert.Cluster }}</td>
              </tr>
              <tr>
                <td><b>Severity</b></td>
                <td>
                  <mark :class="'alert-severity alert-severity-' + alert.SeverityName">{{ alert.SeverityName }}</mark>
                </td>
              </tr>
              <tr>
                <td><b>Status</b></td>
                <td>{{ alert.Status }}</td>
              </tr>
              <tr>
                <td><b>Description</b></td>
                <td>{{ alert.Text }}</td>
              </tr>
              <tr>
                <td><b>Generator URL</b></td>
                <td><a :href="alert.GeneratorURL" target="_blank">PROMETHEUS SOURCE</a></td>
              </tr>
              <tr>
                <td><b>Runbook URL</b></td>
                <td>
                  <a :href="alert.RunbookURL" target="_blank">{{ alert.Summary }}</a>
                </td>
              </tr>
              <tr>
                <td><b>Create time</b></td>
                <td>{{ alert.CreateTime }}</td>
              </tr>
              <tr>
                <td><b>Duplicates</b></td>
                <td>{{ alert.DuplicateCount }}</td>
              </tr>
              <tr>
                <td><b>Update time</b></td>
                <td>{{ alert.UpdateTime }}</td>
              </tr>
              <tr>
                <td><b>Event type</b></td>
                <td>{{ alert.Type }}</td>
              </tr>
              <tr>
                <td><b>Fingerprint</b></td>
                <td>{{ alert.FingerPrint }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup lang="ts">
  import { useAlertStore } from '../../stores/alert-store'
  import { storeToRefs } from 'pinia'

  const { alert } = storeToRefs(useAlertStore())
</script>
