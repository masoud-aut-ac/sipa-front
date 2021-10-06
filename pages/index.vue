<template>
  <div class="mr-20 font-serif text-sm max-h-screen">
    <div class="grid grid-cols-12 gap-4">
      <div v-if="this.getSideSheet" class="col-span-12 lg:col-span-3">
        <AppSearchInfo
          :allowedFilterTypes="allowedFilterTypes"
          :isGeneralPage="true"
        />
      </div>
      <div
        :class="
          this.getSideSheet
            ? 'col-span-12 lg:col-span-9 mt-4 mb-4'
            : 'col-span-12 mt-4 mb-7 ml-4'
        "
        style="direction: rtl"
      >
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-2">
          <AppFilterDate
            :isGeneralPage="true"
            class="col-span-1 lg:col-span-2 pt-2"
          />
          <AppFilterChips
            :allowedFilterTypes="allowedFilterTypes"
            class="col-span-1 lg:col-span-4"
          />
        </div>
        <div class="grid grid-cols-12 gap-2 mt-2">
          <div class="col-span-12 lg:col-span-2 flex">
            <AppAnnualStatistics
              class="flex-grow mb-2"
              :generalData="generalData"
            />
          </div>
          <div class="col-span-12 lg:col-span-10">
            <div class="grid grid-cols-12 gap-2">
              <AppAnnualTabs
                :injuredYearData="injuredData"
                :deadYearData="deadData"
                class="col-span-12 lg:col-span-8"
              />
              <div class="col-span-12 lg:col-span-4">
                <AppAnnualChart :graphData="dayData" :title="dayTitle" />
                <AppAnnualChart :graphData="monthData" :title="monthTitle" />
              </div>
            </div>
            <div class="col-span-12 lg:col-span-10">
              <AppAnnualChart :graphData="hourData" :title="hourTitle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppFilterChips from "~/components/App/AppFilterChips.vue";
import AppSearchInfo from "~/components/App/AppSearchInfo.vue";
import AppAnnualStatistics from "~/components/App/AppAnnual/AppAnnualStatistics.vue";
import AppAnnualChart from "~/components/App/AppAnnual/AppAnnualChartCard.vue";
import AppAnnualTabs from "~/components/App/AppAnnual/AppAnnualTabs.vue";

export default {
  middleware: "auth",
  data() {
    return {
      generalData: {},
      dayTitle: "روز تصادف‌ها",
      dayData: [],
      monthTitle: "ماه تصادف‌ها",
      monthData: [],
      hourTitle: "ساعت تصادف‌ها",
      hourData: [],
      injuredData: [],
      deadData: [],
      allowedFilterTypes: [
        "province",
        "infoSource",
        "infoDevice",
        "vehicleType",
        "incidentType",
        "incidentPart",
        "incidentReason",
      ],
    };
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
      getFilters: "filters/getFilters",
    }),
  },
  components: {
    AppFilterChips,
    AppSearchInfo,
    AppAnnualChart,
    AppAnnualStatistics,
    AppAnnualTabs,
  },
  methods: {
    ...mapMutations({
      setSideSheet: "index/setSideSheet",
    }),
    fetchGeneralData() {
      let vm = this;
      vm.$axios({
        method: "post",
        url: "GeneralSummury",
        data: this.getFilters,
      })
        .then((res) => {
          this.generalData = res.data.detail;
        })
        .then((resp) => {
          this.drawGraphDay();
          this.drawGraphMonth();
          this.drawGraphHour();
          this.drawGraphDead();
          this.drawGraphInjured();
        });
    },
    drawGraphDay() {
      let vm = this;
      vm.dayData = vm.generalData.daysDist.map((x) => {
        return [x.Key, x.Value];
      });
    },
    drawGraphMonth() {
      let vm = this;
      vm.monthData = vm.generalData.monthDist.map((x) => {
        return [x.Key, x.Value];
      });
    },
    drawGraphHour() {
      let vm = this;
      vm.hourData = vm.generalData.hoursDist.map((x) => {
        return [x.Key, x.Value];
      });
    },
    drawGraphDead() {
      let vm = this;
      vm.deadData = vm.generalData.deadYearsDist.map((x) => {
        return [x.Key, x.Value];
      });
    },
    drawGraphInjured() {
      let vm = this;
      vm.injuredData = vm.generalData.injuredYearsDist.map((x) => {
        return [x.Key, x.Value];
      });
    },
  },
  created() {
    this.fetchGeneralData();
  },
  beforeMount() {
    this.$nuxt.$on("update-sipa-general", () => {
      this.fetchGeneralData();
    });
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
</style>