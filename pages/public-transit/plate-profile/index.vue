<template>
  <div class="mr-20 font-serif text-sm" style="direction: rtl">
    <div
      class="
        grid grid-cols-12
        mt-4
        mb-4
        ml-3
        bg-white
        rounded-lg
        p-4
        lg:p-8 lg:pb-3
        shadow-md
        gap-4
      "
    >
      <div class="col-span-12">
        <div class="flex items-stretch m-2">
          <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
          <p class="mr-2">پروفایل پلاک</p>
          <v-spacer></v-spacer>
          <div class="cursor-pointer" @click="$router.push('/public-transit')">
            <div class="flex">
              <p class="mt-0.5">بازگشت</p>
              <v-icon>mdi-chevron-left</v-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 grid grid-cols-3 xl:grid-cols-5">
        <div class="col-span-1 xl:col-span-2"></div>
        <div class="col-span-1">
          <div class="flex">
            <button
              v-for="p in periodsComputed"
              :key="p.value"
              class="
                py-2
                px-2
                flex-1
                bg-gray-100
                transition
                duration-100
                ease-in-out
                transform
                hover:scale-110 hover:shadow-sm
              "
              :class="{ selected: period == p.value }"
              @click="setPeriod(p.value)"
            >
              {{ p.text }}
            </button>
          </div>
          <div class="col-span-1 xl:col-span-2"></div>
        </div>
      </div>
      <div class="col-span-12">
        <v-data-table
          :headers="headers"
          :items="[getPlateRecord]"
          class="shadow my-4"
          hide-default-header
          hide-default-footer
          key="table1"
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
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-6 mb-4 ml-3 bg-white rounded-lg p-4 shadow-md gap-4">
        <div class="flex items-stretch m-2 pb-4">
          <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
          <p class="mr-2">مبادی و مقاصد پرتکرار</p>
        </div>
        <ODMap :ODes="profileODes" />
      </div>
      <div class="col-span-6 mb-4 ml-3 bg-white rounded-lg p-4 shadow-md gap-4">
        <div class="flex items-stretch m-2 pb-4">
          <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
          <p class="mr-2">سهم تجمعی سرعت‌های لحظه‌ای مشاهده شده</p>
        </div>
        <app-chart-line
          :graphData="speedsChartData"
          :height="'400px'"
          :xAxisTitle="'سرعت (کیلومتر بر ساعت)'"
          :yAxisTitle="'درصد مشاهدات'"
        />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-3 mb-4 bg-white rounded-lg p-4 shadow-md">
        <div class="flex items-stretch m-2">
          <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
          <p class="mr-2">شاخص‌های کلی</p>
        </div>
        <v-data-table
          :headers="personalIndexHeaders"
          :items="personalIndexes"
          class="shadow my-4"
          hide-default-header
          hide-default-footer
          key="table2"
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
      </div>
      <div class="col-span-6 mb-4 bg-white rounded-lg p-4">
        <div class="flex items-stretch m-2 pb-2">
          <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
          <p class="mr-2">تخلفات رانندگی</p>
          <v-spacer></v-spacer>
          <div>
            <div class="flex">
              <p class="mt-0.5">
                تعداد تخلف بر هزار کیلومتر رانندگی: {{ averageCrimePerKKM }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="this.crimesGraphSlices.slices.length">
          <AppChartPie :graphData="crimesGraphSlices" />
        </div>
        <div v-else class="text-center flex" style="height: 80%">
          <span class="m-auto">
            <v-icon style="font-size: 100px; color: #329903"
              >mdi-shield-check</v-icon
            >
          </span>
        </div>
      </div>
      <div class="col-span-3 mb-4 ml-3 bg-white rounded-lg p-4 shadow-md gap-4">
        <div class="flex items-stretch m-2">
          <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
          <p class="mr-2">صدک‌ها</p>
        </div>
        <v-data-table
          :headers="hazardIndexHeaders"
          :items="hazardIndexes"
          class="shadow my-4"
          hide-default-header
          hide-default-footer
          key="table2"
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { headers } from "./../table-headers.js";
import {
  personalIndexHeaders,
  profileToPersonalIndexes,
} from "./personal-index-table.js";
import {
  hazardIndexHeaders,
  profileToHazardIndexes,
} from "./hazard-index-table.js";
import { crimeCodesToPieChartSlices } from "./crime-codes.js";
import AppChartPie from "~/components/App/AppChart/AppChartPie.vue";
import AppChartLine from "~/components/App/AppChart/AppChartLine.vue";
import ODMap from "~/components/App/AppPublicTransit/PlateProfile/ODMap.vue";

export default {
  data() {
    return {
      headers,
      personalIndexHeaders,
      hazardIndexHeaders,
      periods: [
        { value: 1, text: "۱ ماهه" },
        { value: 3, text: "۳ ماهه" },
        { value: 6, text: "۶ ماهه" },
      ],
      period: 1,
      profile: null,
    };
  },
  components: {
    AppChartPie,
    AppChartLine,
    ODMap,
  },
  computed: {
    ...mapGetters({
      getPlateRecord: "index/getPlateRecord",
    }),
    periodsComputed() {
      return this.periods.filter((x) =>
        this.getPlateRecord.profiles.find((y) => y.period == x.value)
      );
    },
    personalIndexes() {
      return profileToPersonalIndexes(this.profile);
    },
    crimesGraphSlices() {
      return { slices: crimeCodesToPieChartSlices(this.profile?.crimeCodes) };
    },
    hazardIndexes() {
      return profileToHazardIndexes(this.profile);
    },
    averageCrimePerKKM() {
      if (this.profile != null) {
        if (this.profile.distance != 0) {
          if (this.profile.crimeCodes != null) {
            let crimesCount = this.profile.crimeCodes
              .map((x) => x[0].length)
              .reduce((res, x) => res + x, 0);

            return ((crimesCount * 100) / this.profile.distance).toFixed(2);
          }
        }
      }
      return "نامشخص";
    },
    profileODes() {
      return this.profile != null
        ? this.profile.most_Trip_Origin_Destination
        : [];
    },
    speedsChartData() {
      if (this.profile != null) {
        let speedsObj = this.profile.speed
          .map((x) => x[0])
          .reduce((res, x) => {
            if (res[x] == null) {
              res[x] = 0;
            }
            res[x] += 1;
            return res;
          }, {});
        let count = 0;
        return Object.keys(speedsObj).map((x) => {
          count += speedsObj[x];
          let y = ((count * 100) / this.profile.speed.length).toFixed(2);
          return { name: x, y: parseFloat(y) };
        });
      }
      return [];
    },
  },
  methods: {
    fetchData() {
      let profileJson = this.getPlateRecord.profiles.find(
        (x) => x.period == this.period
      )?.profileJson;
      this.profile = JSON.parse(profileJson);
    },
    setPeriod(value) {
      if (this.period != value) {
        this.period = value;
        this.fetchData();
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
.selected {
  background-color: #fcc66b;
}
button:focus {
  outline: none;
}
</style>