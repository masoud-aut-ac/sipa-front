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
            class="col-span-1 lg:col-span-2 pt-2"
          />
          <AppFilterChips
            :allowedFilterTypes="allowedFilterTypes"
            class="col-span-1 lg:col-span-4"
          />
        </div>
        <div class="grid grid-cols-12 gap-2 mt-2">
          <v-progress-circular
        v-if="isLoadingData"
        :size="60"
        :width="4"
        indeterminate
        style="margin: 10% 45%"
        color="#FFA000"
      ></v-progress-circular>
      <div v-else>
        <v-data-table
          :headers="firstTableHeaders"
          :items="recordsComputed"
          class="shadow my-4 temp"
          light
          hide-default-header
          hide-default-footer
          @click:row="rowClick"
          key="test"
          :items-per-page="20"
        >
          <template v-slot:header="{ props: { headers } }">
            <thead>
              <tr>
                <th
                  v-for="h in headers"
                  :key="h.value"
                  :class="tableHeadersColor"
                >
                  <span>{{ h.text }}</span>
                </th>
              </tr>
            </thead>
          </template>
        </v-data-table>
        <div class="text-center">
          <v-btn
            fab
            :dark="pageNumber != 1"
            color="#ffa200"
            x-small
            :disabled="pageNumber == 1"
            @click="previousPage"
            ><v-icon large>mdi-chevron-right</v-icon></v-btn
          >
          <span class="mx-3">{{ pageNumber + " از " + totalPages }}</span>
          <v-btn
            fab
            :dark="pageNumber != totalPages"
            color="#ffa200"
            x-small
            :disabled="pageNumber == totalPages"
            @click="nextPage"
            ><v-icon large>mdi-chevron-left</v-icon></v-btn
          >
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
      dayTitle: "روز تصادف‌های فوتی",
      dayData: [],
      days: [
        { persianName: "شنبه", englishName: "Saturday", y: null },
        { persianName: "یکشنبه", englishName: "Sunday", y: null },
        { persianName: "دوشنبه", englishName: "Monday", y: null },
        { persianName: "سه‌شنبه", englishName: "Tuesday", y: null },
        { persianName: "چهارشنبه", englishName: "Wednesday", y: null },
        { persianName: "پنجشنبه", englishName: "Thursday", y: null },
        { persianName: "جمعه", englishName: "Friday", y: null },
      ],
      monthTitle: "ماه تصادف‌های فوتی",
      monthData: [],
      months: [
        { persianName: "فروردین", key: 1, y: null },
        { persianName: "اردیبهشت", key: 2, y: null },
        { persianName: "خرداد", key: 3, y: null },
        { persianName: "تیر", key: 4, y: null },
        { persianName: "مرداد", key: 5, y: null },
        { persianName: "شهریور", key: 6, y: null },
        { persianName: "مهر", key: 7, y: null },
        { persianName: "آبان", key: 8, y: null },
        { persianName: "آذر", key: 9, y: null },
        { persianName: "دی", key: 10, y: null },
        { persianName: "بهمن", key: 11, y: null },
        { persianName: "اسفند", key: 12, y: null },
      ],
      hourTitle: "ساعت تصادف‌های فوتی",
      hourData: [],
      hours: [
        { persianName: "0", key: 0, y: null },
        { persianName: "1", key: 1, y: null },
        { persianName: "2", key: 2, y: null },
        { persianName: "3", key: 3, y: null },
        { persianName: "4", key: 4, y: null },
        { persianName: "5", key: 5, y: null },
        { persianName: "6", key: 6, y: null },
        { persianName: "7", key: 7, y: null },
        { persianName: "8", key: 8, y: null },
        { persianName: "9", key: 9, y: null },
        { persianName: "10", key: 10, y: null },
        { persianName: "11", key: 11, y: null },
        { persianName: "12", key: 12, y: null },
        { persianName: "13", key: 13, y: null },
        { persianName: "14", key: 14, y: null },
        { persianName: "15", key: 15, y: null },
        { persianName: "16", key: 16, y: null },
        { persianName: "17", key: 17, y: null },
        { persianName: "18", key: 18, y: null },
        { persianName: "19", key: 19, y: null },
        { persianName: "20", key: 20, y: null },
        { persianName: "21", key: 21, y: null },
        { persianName: "22", key: 22, y: null },
        { persianName: "23", key: 23, y: null },
      ],
      injuredData: [],
      deadData: [],
    };
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
      getFilters: "filters/getFilters",
      getLoggedInUser: "index/getLoggedInUser",
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
      ];
      this.getFilters.province !== null ? res.push("city") : res.push("");
      return res;
    },
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
      deleteRemovedFilterIds: "filters/deleteRemovedFilterIds",
      setFilterValue: "filters/setFilterValue",
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
      let res = vm.generalData.daysDist.map((x) => {
        return { englishName: x.key, y: x.value };
      });
      vm.dayData = vm.days;
      vm.dayData.forEach((x) => {
        return (x.y = res.find((a) => a.englishName === x.englishName)
          ? (x.y = res.find((a) => a.englishName === x.englishName).y)
          : 0);
      });
    },
    drawGraphMonth() {
      let vm = this;
      let res = vm.generalData.monthDist.map((x) => {
        return { key: x.key, y: x.value };
      });
      vm.monthData = vm.months;
      vm.monthData.forEach((x) => {
        return (x.y = res.find((a) => a.key === x.key)
          ? res.find((a) => a.key === x.key).y
          : null);
      });
      vm.monthData = vm.monthData.filter((x) => x.y != null);
    },
    drawGraphHour() {
      let vm = this;
      let res = vm.generalData.hoursDist.map((x) => {
        return { key: x.key, y: x.value };
      });
      vm.hourData = vm.hours;
      vm.hourData.forEach((x) => {
        return (x.y = res.find((a) => a.key === x.key)
          ? (x.y = res.find((a) => a.key === x.key).y)
          : 0);
      });
    },
    drawGraphDead() {
      let vm = this;
      vm.deadData = vm.generalData.deadYearsDist.map((x) => {
        return [x.key, x.value];
      });
    },
    drawGraphInjured() {
      let vm = this;
      vm.injuredData = vm.generalData.injuredYearsDist.map((x) => {
        return [x.key, x.value];
      });
    },
  },
  created() {
    if (!this.getLoggedInUser.isAdmin)
      window.location.href = window.location.origin + "/data-cleaning";

    this.fetchGeneralData();
    this.deleteRemovedFilterIds(10);
    this.setFilterValue({ id: 10, value: null });
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
</style>