<template>
  <v-card class="font-serif px-4 pb-4 mb-2" light style="direction: rtl">
    <v-tabs light>
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

      <v-tab-item>
        <AppAnnualChart :graphData="deadYearData" :isInTabs="true" class="mt-24" />
      </v-tab-item>

      <v-tab-item>
        <AppAnnualChart :graphData="injuredYearData" :isInTabs="true" class="mt-24" />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>


<script>
export default {
  props: {
    deadYearData: {
      type: Array,
    },
    injuredYearData: {
      type: Array,
    },
  },
  data() {
    return {
      tab: null,
      items: [{ tab: "نقشه" }, { tab: "نمودار فوتی" }, { tab: "نمودار جرحی" }],
    };
  },
};
</script>

<style>
.theme--dark.v-tabs-items {
  background-color: white;
}
.v-window-item .v-window-item--active {
  background-color: white;
}
</style>