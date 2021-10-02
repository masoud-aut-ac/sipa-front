<template>
  <v-card class="mb-2 text-sm font-serif mb-2" style="direction: rtl">
    <div class="flex m-4">
      <v-icon x-small color="#FFA000" class="ml-2 mt-1">mdi-circle</v-icon>
      <p>{{ title }}</p>
    </div>
    <AppChartColumn :graphData="graphData" :isAnnualPage="true" />
  </v-card>
</template>

<script>
import AppChartColumn from "~/components/App/AppChart/AppChartColumn.vue";

export default {
  props: {
    graphData: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
    },
  },
  components: {
    AppChartColumn,
  },
};
</script>