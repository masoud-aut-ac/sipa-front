<template>
  <div class="mr-20 font-serif text-sm">
    <div class="grid grid-cols-12 gap-4">
      <div v-if="this.getSideSheet"  class="col-span-12 lg:col-span-3">
        <AppSearchInfo
          :allowedFilterTypes="allowedFilterTypes"
          :onUpdateFilters="this.updateSipaCharts"
          :showComparison="true"
        />
      </div>
      <div
        :class="
          this.getSideSheet
            ? 'col-span-12 lg:col-span-9 mt-4 mb-7'
            : 'col-span-12 mt-4 mb-7 ml-4'
        "
      >
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <AppFilterChips
            :allowedFilterTypes="allowedFilterTypes"
            class="col-span-1 lg:col-span-4"
          />
          <AppFilterDate
            :onUpdateDate="this.updateSipaCharts"
            class="col-span-1 lg:col-span-2 pt-2"
          />
        </div>
        <ChartsContainer class="mt-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppFilterChips from "~/components/App/AppFilterChips.vue";
import AppFilterDate from "~/components/App/AppFilterDate.vue";
import AppSearchInfo from "~/components/App/AppSearchInfo.vue";
import ChartsContainer from "~/components/Index/ChartsContainer.vue";

export default {
  middleware: "auth",
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
      getFilters: "filters/getFilters",
    }),
    allowedFilterTypes() {
      let res = [
        "province",
        "infoSource",
        "infoDevice",
        "vehicleType",
        "incidentType",
        "incidentPart",
        "incidentReason",
        "incidentInjuriesType",
      ];
      this.getFilters.province !== null ? res.push("city") : res.push("");
      return res;
    },
  },
  components: {
    AppFilterChips,
    AppFilterDate,
    AppSearchInfo,
    ChartsContainer,
  },
  methods: {
    ...mapMutations({
      setSideSheet: "index/setSideSheet",
    }),
    updateSipaCharts() {
      this.$nuxt.$emit("update-sipa-charts");
    },
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
</style>