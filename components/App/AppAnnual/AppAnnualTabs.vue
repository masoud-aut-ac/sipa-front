<template>
  <v-card class="font-serif px-4 pb-4 mb-2" light style="direction: rtl">
    <v-tabs>
      <v-tabs-slider color="#FFA000"></v-tabs-slider>

      <v-tab
        style="font-weight: bold; font-size: 0.725rem"
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>

      <v-tab-item>
        <AppAnnualMap />
      </v-tab-item>

      <v-tab-item >
        <AppChartColumn :graphData="graphDataInjury" />
      </v-tab-item>

      <v-tab-item >
        <AppChartColumn :graphData="graphDataDeath" />
      </v-tab-item>

    </v-tabs>
  </v-card>
</template>


<script>
export default {
  data() {
    return {
      tab: null,
      items: [{ tab: "نقشه" }, { tab: "نمودار فوتی" }, { tab: "نمودار جرحی" }],
      graphDataInjury: [
        {
          slices: [
            ["1398", 160],
            ["1399", 87],
            ["1400", 43],
          ],
        },
      ],
      graphDataDeath: [
        {
          slices: [
            ["1398", 100],
            ["1399", 50],
            ["1400", 40],
          ],
        },
      ],
    };
  },
};
</script>

<style>
.theme--dark.v-tabs-items {
    background-color: white;
}
</style>