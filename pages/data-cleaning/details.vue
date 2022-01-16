<template>
  <div class="mr-20 text-sm max-h-screen" style="direction: rtl">
    <div class="mt-4 mb-7 ml-4 bg-white rounded-lg p-4 lg:p-8 shadow-md">
      <div class="flex items-stretch m-2">
        <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
        <p class="mr-2">داده‌های مشابه</p>
        <v-spacer></v-spacer>
        <div class="cursor-pointer" @click="$router.push('/data-cleaning')">
          <div class="flex">
            <p class="mt-0.5">بازگشت</p>
            <v-icon>mdi-chevron-left</v-icon>
          </div>
        </div>
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
          :items="recordsComputed"
          class="shadow my-4"
          light
          hide-default-header
          hide-default-footer
          @click:row="rowClick"
        >
          <template v-slot:header="{ props: { headers } }">
            <thead>
              <tr>
                <th v-for="h in headers" :key="h" :class="tableHeadersColor">
                  <span>{{ h.text }}</span>
                </th>
              </tr>
            </thead>
          </template>
        </v-data-table>
        <v-dialog light v-model="dialog" width="770px">
          <div class="bg-white rounded p-2">
            <div class="text-right">
              <v-btn icon @click="dialog = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
            <v-data-table
              :headers="headers"
              :items="similarsComputed"
              class="shadow m-2"
              light
              hide-default-header
              hide-default-footer
              dir="rtl"
            >
              <template v-slot:header="{ props: { headers } }">
                <thead>
                  <tr>
                    <th
                      v-for="h in headers"
                      :key="h"
                      :class="tableHeadersColor"
                    >
                      <span>{{ h.text }}</span>
                    </th>
                  </tr>
                </thead>
              </template>
            </v-data-table>
          </div>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppFilterDate from "~/components/App/AppFilterDate.vue";

export default {
  middleware: "auth",
  data() {
    return {
      isLoadingData: false,
      dialog: false,
      records: [],
      similars: [],
      headers: [
        {
          text: "روز تصادف",
          align: "center",
          sortable: false,
          value: "hisDate",
        },
        {
          text: "ساعت تصادف",
          sortable: false,
          align: "center",
          value: "hisTime",
        },
        {
          text: "محل تصادف",
          sortable: false,
          align: "center",
          value: "address",
        },
        {
          text: "تعداد فوتی",
          sortable: false,
          align: "center",
          value: "deadCount",
        },
        {
          text: "تعداد مجروح",
          sortable: false,
          align: "center",
          value: "injuredCount",
        },
        {
          text: "نوع برخورد",
          sortable: false,
          align: "center",
          value: "incidentType",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
      getDataCleaningDetail: "index/getDataCleaningDetail",
    }),
    recordsComputed() {
      let res = this.records.map((x) => x.Key);
      res.forEach(
        (x) =>
          (x.hisTime =
            String(x.hisTime).slice(0, 2) + ":" + String(x.hisTime).slice(2, 4))
      );
      res.forEach(
        (x) =>
          (x.hisDate =
            String(x.hisDate).slice(0, 4) +
            "/" +
            String(x.hisDate).slice(4, 6) +
            "/" +
            String(x.hisDate).slice(6, 8))
      );
      return res;
    },
    similarsComputed() {
      this.similars.forEach((x) =>
        x.hisTime !== 0
          ? (x.hisTime =
              String(x.hisTime).slice(0, 2) +
              ":" +
              String(x.hisTime).slice(2, 4))
          : (x.hisTime = x.hisTime)
      );
      this.similars.forEach((x) =>
        x.hisDate !== 0
          ? (x.hisDate =
              String(x.hisDate).slice(0, 4) +
              "/" +
              String(x.hisDate).slice(4, 6) +
              "/" +
              String(x.hisDate).slice(6, 8))
          : (x.hisDate = x.hisDate)
      );
      return this.similars;
    },
    tableHeadersColor() {
      let res;
      switch (this.getDataCleaningDetail.actionName) {
        case "SimilarsOne":
          res = "bg-green-900 text-black";
          break;
        case "SimilarsTwo":
          res = "bg-green-400 text-black";
          break;
        case "SimilarsThree":
          res = "bg-yellow text-black";
          break;
        case "SimilarsFour":
          res = "bg-orange text-black";
          break;
        case "SimilarsFive":
          res = "bg-red text-black";
          break;
        case "SimilarsSix":
          res = "bg-red-900 text-black";
          break;
      }
      return res;
    },
    // selectTableHeaders() {
    //   let res;
    //   switch (this.getDataCleaningDetail.actionName) {
    //     case "SimilarsOne":
    //       res = this.headersSimilars0;
    //       break;
    //     case "SimilarsTwo":
    //       res = this.headersSimilars1;
    //       break;
    //     case "SimilarsThree":
    //       res = this.headersSimilars2;
    //       break;
    //     case "SimilarsFour":
    //       res = this.headersSimilars3;
    //       break;
    //     default:
    //       res = this.headersSimilars4;
    //   }
    //   return res;
    // },
  },
  components: {
    AppFilterDate,
  },
  methods: {
    rowClick(item) {
      this.dialog = true;
      this.similars = this.records.find((x) => item.id === x.Key.id).Value;
    },
    getDataCleaningDetails() {
      let vm = this;
      vm.isLoadingData = true;
      return this.$axios({
        method: "post",
        url: "DataCleaningReport/Details",
        data: {
          ...vm.getDataCleaningDetail,
          startTime: vm.getFilters.startTime,
          endTime: vm.getFilters.endTime,
          take: 50,
          skip: 0,
        },
      })
        .then((response) => (vm.records = response.data.detail.records))
        .then((res) => (vm.isLoadingData = false));
    },
  },
  created() {
    this.getDataCleaningDetails();
  },
};
</script>

<style>
.v-btn {
  font-weight: normal !important;
}
tr:hover {
  cursor: pointer !important;
}
.v-btn:focus {
  outline: none !important;
}
</style>