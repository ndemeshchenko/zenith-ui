<template>
<alert-detail :id="id" @close="$router.push({ name: 'alerts' })"/>

</template>

<script setup lang="ts">
import { onMounted, defineProps } from "vue";
// import { Component, Vue, Prop } from 'vue-facing-decorator'
import AlertDetail from '../../../components/alerts/AlertDetail.vue';
import { useAlertStore } from '../../../stores/alert-store';

const props = defineProps<{
  id?: String
}>()

onMounted(() => {
  useAlertStore().fetchAlert(props.id);

});
</script>

<style>
</style>
