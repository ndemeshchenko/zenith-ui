<template>
  <div class="markup-tables flex" v-if="alert">
    <va-card class="flex mb-4">
      <va-card-title>Alert Detail</va-card-title>
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table">
            <tbody>
              <tr>
                <tr>
            <td><b>Environment</b></td>
            <td>{{ alert.Environment }}</td>
            <!-- <td class="text-danger">28.76% <i class="ti-arrow-down"></i></td>
            <td><label class="badge badge-danger">Pending</label></td> -->
          </tr>
          <tr>
            <td><b>Cluster</b></td>
            <td>{{ alert.Cluster }}</td>
            <!-- <td class="text-danger">21.06% <i class="ti-arrow-down"></i></td>
            <td><label class="badge badge-warning">In progress</label></td> -->
          </tr>
          <tr>
            <td><b>Severity</b></td>
            <!-- <td>{{ alert.SeverityName }}</td> -->
            <td>
              <mark
            :class="'alert-severity alert-severity-' + alert.SeverityName"
            >{{ alert.SeverityName }}</mark
          >
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
            <td>
              <a v-bind:href="alert.GeneratorURL" target="_blank">PROMETHEUS SOURCE</a>
              </td>
          </tr>
          <tr>
            <td><b>Runbook URL</b></td>
            <td>
              <a v-bind:href="alert.RunbookURL" target="_blank">{{ alert.Summary }}</a>
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
            <td>{{ alert.Fingerprint }}</td>
          </tr>
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

  // const {alert } = storeToRefs(useAlertsStore());
  // export default {
  //   components: {},
  //   props: {
  //     id: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // };
</script>
