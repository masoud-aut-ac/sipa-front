<template>
  <div class="mr-20 text-sm max-h-screen" style="direction: rtl">
    <div class="mt-4 mb-7 ml-4">
      <!-- Start of filters -->
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-2">
        <AppFilterDate class="col-span-1 lg:col-span-2 pt-2" />
        <div
          class="
            col-span-1
            lg:col-span-3
            bg-white
            rounded-lg
            p-1
            shadow-md
            pt-2
            px-4
          "
        >
          <div class="flex">
            <p class="mt-2 ml-2">استان:</p>
            <selectvue
              v-model="province"
              :options="provinces"
              label="persianName"
              :reduce="(option) => option.id"
              placeholder="انتخاب کنید"
              dir="rtl"
              class="style-chooser flex-1"
            ></selectvue>
          </div>
        </div>
        <v-btn
          block
          dark
          color="#FFA000"
          class="lg:mt-3"
          @click="getDataCleaningReports"
          >بررسی</v-btn
        >
      </div>
      <!-- End of filters -->

      <v-progress-circular
        v-if="isLoadingData"
        :size="60"
        :width="4"
        indeterminate
        style="margin: 15% 45%"
        color="#FFA000"
      ></v-progress-circular>
      <!-- Start of data cleaning groups -->
      <div v-else class="pb-8">
        <div class="bg-white rounded-lg p-6 shadow-md mt-4">
          <div class="flex items-stretch m-2">
            <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
            <p class="mr-2">توزیع داده های ثبت سوانح</p>
          </div>
          <app-chart-stacked :graphData="samanehGraphData"></app-chart-stacked>
        </div>
        <div class="bg-white rounded-lg p-6 shadow-md mt-4">
          <div class="flex items-stretch m-2">
            <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
            <p class="mr-2">توزیع داده های پلیس</p>
          </div>
          <app-chart-stacked :graphData="policeGraphData"></app-chart-stacked>
        </div>
        <div v-for="group in groups" :key="group.persianTitle">
          
          <div class="flex items-stretch m-2 mt-8 mb-4">
            <v-icon x-small color="#FFA000">mdi-circle</v-icon>
            <p class="text-lg mr-2">{{ group.persianTitle }}</p>
          </div>
          <div
            v-for="action in group.actions"
            :key="action.actionName"
            class="
              mt-4
              bg-white
              shadow-md
              rounded
              p-4
              lg:p-8
              grid grid-cols-12
              gap-2
            "
            :style="{
              'border-right-width': '12px',
              'border-color': action.color ? action.color : '#e0daee',
            }"
          >
            <p
              class="col-span-12 lg:col-span-6 2xl:col-span-8 text-lg font-bold"
            >
              {{ action.actionPersianName }}
            </p>
            <div
              class="
                col-span-12
                sm:col-span-6
                lg:col-span-3
                2xl:col-span-2
                flex
              "
            >
              <v-btn
                block
                :color="action.color ? action.color : '#e0daee'"
                @click="showSimilars(action, 1)"
                >{{ "تصادفات جرحی: " + action.countInjuredAccidents }}</v-btn
              >
            </div>
            <div
              class="
                col-span-12
                sm:col-span-6
                lg:col-span-3
                2xl:col-span-2
                flex
              "
            >
              <v-btn
                block
                :color="action.color ? action.color : '#e0daee'"
                @click="showSimilars(action, 0)"
                >{{ "تصادفات فوتی: " + action.countDeadAccidents }}</v-btn
              >
            </div>
          </div>
        </div>
      </div>
      <!-- End of data cleaning groups -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppFilterDate from "~/components/App/AppFilterDate.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  middleware: "auth",
  data() {
    return {
      province: null,
      provinces: [],
      isLoadingData: false,
      groups: [],
      provinceActions: [],
      policeTotalRecords: null,
      sabteSavanehTotalRecords: null,
    };
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
      getDataCleaningDetail: "index/getDataCleaningDetail",
    }),
    policeGraphData() {
      let res = { categories: [], series: [] };
      if (this.provinceActions.length > 0) {
        res.categories = this.provinceActions.map((x) => x.persianName);
        res.series = this.provinceActions[0].actions
          .filter(
            (y) =>
              (y.sourceID == 2 ||
                y.actionName == "SimilarsOne" ||
                y.actionName == "SimilarsTwo") &&
              y.actionName !== "PoliceLocationCorrection"
          )
          .map((x) => {
            return { name: x.actionPersianName, data: [] };
          });
        this.provinceActions.forEach((x) => {
          x.actions
            .filter(
              (y) =>
                (y.sourceID == 2 ||
                  y.actionName == "SimilarsOne" ||
                  y.actionName == "SimilarsTwo") &&
                y.actionName !== "PoliceLocationCorrection"
            )
            .forEach((y, i) => {
              res.series[i].data.push(
                ((y.countDeadAccidents + y.countInjuredAccidents) * 100.0) /
                  x.policeTotalRecords
              );
            });
        });
      }
      return res;
    },
    samanehGraphData() {
      let res = { categories: [], series: [] };
      if (this.provinceActions.length > 0) {
        res.categories = this.provinceActions.map((x) => x.persianName);
        res.series = this.provinceActions[0].actions
          .filter((y) => y.sourceID == 1)
          .map((x) => {
            return { name: x.actionPersianName, data: [] };
          });
        this.provinceActions.forEach((x) => {
          x.actions
            .filter((y) => y.sourceID == 1)
            .forEach((y, i) => {
              res.series[i].data.push(
                ((y.countDeadAccidents + y.countInjuredAccidents) * 100.0) /
                  x.policeTotalRecords
              );
            });
        });
      }
      return res;
    },
  },
  components: {
    AppFilterDate,
    selectvue: vSelect,
  },
  methods: {
    ...mapMutations({
      setDataCleaningDetail: "index/setDataCleaningDetail",
    }),
    showSimilars(action, incidentType) {
      this.setDataCleaningDetail({
        actionName: action.actionName,
        incidentInjuryType: incidentType,
      });
      this.$router.push("/data-cleaning/details");
    },
    getProvinces() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "Province",
      }).then((response) => (vm.provinces = response.data.detail.provinces));
    },
    getDataCleaningReports() {
      let vm = this;
      vm.isLoadingData = true;
      return this.$axios({
        method: "post",
        url: "DataCleaningReport",
        data: {
          province: vm.province,
          startTime: vm.getFilters.startTime,
          endTime: vm.getFilters.endTime,
        },
      })
        .then((response) => {
          vm.groups = response.data.detail.groups;
          vm.provinceActions = response.data.detail.provinceGroups;
        })
        .then((res) => (vm.isLoadingData = false));
    },
  },
  created() {
    this.getProvinces();
    this.getDataCleaningReports();
  },
};
</script>

<style>
.v-btn {
  font-weight: normal !important;
}
.style-chooser .vs__search::placeholder {
  color: black;
}
.style-chooser .vs__search {
  color: black;
}
.style-chooser .vs__dropdown-toggle {
  padding: 5px 0 5px 0;
}
</style>