<template>
  <div class="mr-20 font-serif text-sm" style="direction: rtl">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-9 mt-4 mb-7">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AppFilterChips class="col-span-1 lg:col-span-2" />
          <AppChartColumn />
          <AppChartColumn />
          <AppChartPie />
          <AppChartPie />
        </div>
      </div>
      <AppSearchInfo class="col-span-12 lg:col-span-3" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppFilterChips from "~/components/App/AppFilterChips.vue";
import AppSearchInfo from "~/components/App/AppSearchInfo.vue";
import AppChartColumn from "~/components/App/AppChartColumn.vue";
import AppChartPie from "~/components/App/AppChartPie.vue";

export default {
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
    }),
  },
  components: {
    AppFilterChips,
    AppSearchInfo,
    AppChartColumn,
    AppChartPie,
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
</style>