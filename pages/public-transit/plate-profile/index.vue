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
              v-for="p in periods"
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
      <div
        class="
          col-span-4
          mb-7
          ml-3
          bg-white
          rounded-lg
          p-4
          shadow-md
          gap-4
        "
      >
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { headers } from "./../table-headers.js";
import {
  personalIndexHeaders,
  profileToPersonalIndexes,
} from "./personalIndexTable.js";

export default {
  data() {
    return {
      headers,
      personalIndexHeaders,
      periods: [
        { value: 1, text: "۱ ماهه" },
        { value: 3, text: "۳ ماهه" },
        { value: 6, text: "۶ ماهه" },
      ],
      period: 1,
      isLoadingData: false,
      profile: null,
      isProfileFound: false,
    };
  },
  computed: {
    ...mapGetters({
      getPlateRecord: "index/getPlateRecord",
    }),
    personalIndexes() {
      return profileToPersonalIndexes(this.profile);
    },
  },
  methods: {
    fetchData() {
      this.isLoadingData = true;
      let vm = this;
      vm.$axios({
        method: "get",
        url: "IncidentsWithPlate",
        params: {
          vehicleInfoID: this.getPlateRecord.vehicleInfoID,
          period: this.period,
        },
      }).then((res) => {
        if (res.data.statusCode == 200) {
          vm.profile = JSON.parse(res.data.detail);
          vm.isProfileFound = true;
        } else {
          vm.profile = null;
          vm.isProfileFound = false;
        }
        vm.isLoadingData = false;
      });
    },
    setPeriod(value) {
      if (this.period != value) {
        this.period = value;
        this.fetchData();
      }
    },
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