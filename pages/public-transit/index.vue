<template>
  <div class="mr-20 font-serif text-sm">
    <div class="grid grid-cols-12 gap-4">
      <div v-if="this.getSideSheet" class="col-span-12 lg:col-span-3">
        <AppSearchInfo
          :allowedFilterTypes="allowedFilterTypes"
          :onUpdateFilters="this.fetchData"
          :showComparison="false"
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
          <AppFilterDate class="col-span-1 lg:col-span-2 pt-2" />
          <AppFilterChips
            :allowedFilterTypes="allowedFilterTypes"
            class="col-span-1 lg:col-span-4"
          />
        </div>
        <div class="text-sm max-h-screen" style="direction: rtl">
          <div class="mt-4 mb-7 bg-white rounded-lg p-4 lg:p-8 shadow-md">
            <div class="flex items-stretch m-2">
              <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
              <p class="mr-2">تصادفات عمومی</p>
              <v-spacer></v-spacer>
            </div>
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
                :headers="headers"
                :items="records"
                class="shadow my-4"
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
                        style="color: white; background-color: #332a7c"
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
import { headers } from "./table-headers.js";

export default {
  middleware: "auth",
  data() {
    return {
      totalPages: 0,
      pageNumber: 1,
      recordsCountPerPage: 10,
      records: [],
      isLoadingData: false,
      headers: headers,
    };
  },
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
      setPlateRecord: "index/setPlateRecord",
    }),
    fetchData() {
      this.isLoadingData = true;
      let vm = this;
      vm.$axios({
        method: "post",
        url: "IncidentsWithPlate",
        data: {
          ...this.getFilters,
          skip: (this.pageNumber - 1) * this.recordsCountPerPage,
          take: this.recordsCountPerPage,
        },
      }).then((res) => {
        this.totalPages = Math.ceil(
          res.data.totalCount / this.recordsCountPerPage
        );
        res.data.detail.forEach((x) => {
          let datetime = this.$convertToDateTime(x.hisDate, x.hisTime);
          x.hisDate = datetime.date;
          x.hisTime = datetime.time;
          x.deadCount = x.deadCount == null ? "نامشخص" : x.deadCount;
          x.injuredCount = x.injuredCount == null ? "نامشخص" : x.injuredCount;
        });
        this.records = res.data.detail;
        vm.isLoadingData = false;
      });
    },
    nextPage() {
      this.pageNumber += 1;
      this.fetchData();
    },
    previousPage() {
      this.pageNumber -= 1;
      this.fetchData();
    },
    rowClick(item) {
      this.setPlateRecord(item);
      this.$router.push("/public-transit/plate-profile");
    },
  },
  created() {
    this.deleteRemovedFilterIds(10);
    this.setFilterValue({ id: 10, value: null });
    this.fetchData();
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
</style>