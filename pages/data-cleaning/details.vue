<template>
  <div class="mr-20 text-sm max-h-screen" style="direction: rtl">
    <div class="mt-4 mb-7 ml-4 bg-white rounded-lg p-4 lg:p-8 shadow-md">
      <div class="flex items-stretch m-2">
        <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
        <p class="mr-2">
          {{
            getDataCleaningDetail.action.actionPersianName +
            "" +
            (getDataCleaningDetail.incidentInjuryType == 0
              ? " (فوتی)"
              : " (جرحی)")
          }}
        </p>
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
        <v-dialog light v-model="dialog" width="950px">
          <div class="bg-white rounded p-2">
            <div class="text-right">
              <v-btn icon @click="dialog = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
            <div v-if="sameHeaders">
              <v-data-table
                :headers="firstTableHeaders"
                :items="oneTableRecords"
                class="shadow m-2"
                light
                hide-default-header
                hide-default-footer
                :item-class="itemRowBackground"
                dir="rtl"
              >
                <template v-slot:header="{ props: { headers } }">
                  <thead>
                    <tr>
                      <th
                        v-for="h in headers"
                        :key="h.value + '4'"
                        style="background-color: #332a7c; color: white"
                      >
                        <span>{{ h.text }}</span>
                      </th>
                    </tr>
                  </thead>
                </template>
              </v-data-table>
            </div>
            <div v-else>
              <v-data-table
                :headers="firstTableHeaders"
                :items="[selectedItem]"
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
                        :key="h.value + '3'"
                        :class="tableHeadersColor.one"
                      >
                        <span>{{ h.text }}</span>
                      </th>
                    </tr>
                  </thead>
                </template>
              </v-data-table>
              <v-data-table
                :headers="secondTableHeaders"
                :items="similars"
                class="shadow m-2 mt-4"
                light
                :item-class="itemRowBackground"
                hide-default-header
                hide-default-footer
                dir="rtl"
              >
                <template v-slot:header="{ props: { headers } }">
                  <thead>
                    <tr>
                      <th
                        v-for="h in headers"
                        :key="h.value + '2'"
                        :class="tableHeadersColor.two"
                      >
                        <span>{{ h.text }}</span>
                      </th>
                    </tr>
                  </thead>
                </template>
              </v-data-table>
              <v-data-table
                v-show="emergencies.length != 0"
                :headers="thirdTableHeaders"
                :items="emergencies"
                class="shadow m-2 mt-4"
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
                        :key="h.value + '2'"
                        :class="tableHeadersColor.two"
                      >
                        <span>{{ h.text }}</span>
                      </th>
                    </tr>
                  </thead>
                </template>
              </v-data-table>
              <v-data-table
                :headers="fourthTableHeaders"
                v-show="redCrescents.length != 0"
                :items="redCrescents"
                class="shadow m-2 mt-4"
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
                        :key="h.value + '2'"
                        :class="tableHeadersColor.two"
                      >
                        <span>{{ h.text }}</span>
                      </th>
                    </tr>
                  </thead>
                </template>
              </v-data-table>
            </div>
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
      emergencies: [],
      redCrescents: [],
      pageNumber: 1,
      selectedItem: null,
      headers: [
        {
          text: "شناسه تصادف",
          align: "center",
          sortable: false,
          value: "nrpID",
        },
        {
          text: "پایگاه داده",
          align: "center",
          sortable: false,
          value: "source",
        },
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
          text: "عرض جفرافیایی",
          sortable: false,
          align: "center",
          value: "latitude",
        },
        {
          text: "طول جغرافیایی",
          sortable: false,
          align: "center",
          value: "longitude",
        },
        {
          text: "استان",
          sortable: false,
          align: "center",
          value: "province",
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
          value: "collisionType",
        },
        {
          text: "اداره کنترل جاده ای",
          sortable: false,
          align: "center",
          value: "roadControlbureau",
        },
        {
          text: "مرکز پلیس",
          sortable: false,
          align: "center",
          value: "policeStation",
        },
        {
          text: "محور تصادف",
          sortable: false,
          align: "center",
          value: "incidentMehvar",
        },
        {
          text: "وسایل نقلیه",
          sortable: false,
          align: "center",
          value: "vehicle",
        },
        {
          text: "فاصله هوایی (کیلومتر)",
          sortable: false,
          align: "center",
          value: "distance",
        },
        {
          text: "رتبه",
          sortable: false,
          align: "center",
          value: "rank",
        },
        {
          text: "امتیاز",
          sortable: false,
          align: "center",
          value: "bonus",
        },
        {
          text: "آدرس",
          sortable: false,
          align: "center",
          value: "address",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
      getDataCleaningDetail: "index/getDataCleaningDetail",
      getProvinceID: "index/getProvinceID",
    }),
    totalPages() {
      var totalRecords =
        this.getDataCleaningDetail.incidentInjuryType == 0
          ? this.getDataCleaningDetail.action.countDeadAccidents
          : this.getDataCleaningDetail.action.countInjuredAccidents;
      return Math.ceil(totalRecords / 20);
    },
    sameHeaders() {
      let res =
        this.firstTableHeaders.length === this.secondTableHeaders.length;
      if (res) {
        for (let i = 0; i < this.firstTableHeaders.length; i++) {
          res &= this.firstTableHeaders[i] === this.secondTableHeaders[i];
        }
      }
      return res;
    },
    firstTableHeaders() {
      let res = [];
      this.records
        .map((x) => x.key)
        .forEach((x) => {
          Object.keys(x).forEach((y) => {
            if (x[y] != null) res.push(y);
          });
        });
      res = this.headers.filter((x) => res.some((y) => x.value == y));
      return res;
    },
    secondTableHeaders() {
      let res = [];
      this.similars.forEach((x) => {
        Object.keys(x).forEach((y) => {
          if (x[y] != null) res.push(y);
        });
      });
      res = this.headers.filter((x) => res.some((y) => x.value == y));
      return res;
    },
    thirdTableHeaders() {
      let res = [];
      this.emergencies.forEach((x) => {
        Object.keys(x).forEach((y) => {
          if (x[y] != null) res.push(y);
        });
      });
      res = this.headers.filter((x) => res.some((y) => x.value == y));
      return res;
    },
    fourthTableHeaders() {
      let res = [];
      this.redCrescents.forEach((x) => {
        Object.keys(x).forEach((y) => {
          if (x[y] != null) res.push(y);
        });
      });
      res = this.headers.filter((x) => res.some((y) => x.value == y));
      return res;
    },
    recordsComputed() {
      let res = this.records.map((x) => x.key);
      // res.forEach((x) => {
      //   let datetime = this.$convertToDateTime(x.hisDate, x.hisTime);
      //   x.hisDate = datetime.date;
      //   x.hisTime = datetime.time;
      // });

      return res;
    },
    // similarsComputed() {
    //   let res = this.similars.map((x) => {
    //     let s = { ...x };
    //     let datetime = this.$convertToDateTime(x.hisDate, x.hisTime);
    //     s.hisDate = datetime.date;
    //     s.hisTime = datetime.time;
    //     return s;
    //   });
    //   return res;
    // },
    oneTableRecords() {
      let res = [];
      res.push({ ...this.selectedItem });
      this.similars.forEach((x) => res.push({ ...x }));
      return res;
    },
    tableHeadersColor() {
      let res;
      switch (this.getDataCleaningDetail.action.actionName) {
        case "PoliceDuplicate":
          res = {
            one: "bg-red-900 text-white-important",
            two: "bg-green-900 text-black",
          };
          break;
        case "SamanehDuplicate":
          res = {
            one: "bg-red-900 text-white-important",
            two: "bg-green-900 text-black",
          };
          break;
        case "SamanehInternalSimilar":
          res = {
            one: "bg-red-900 text-white-important",
            two: "bg-green-900 text-black",
          };
          break;
        case "PoliceInternalSimilars":
          res = {
            one: "bg-red-900 text-white-important",
            two: "bg-green-900 text-black",
          };
          break;
        case "SimilarsOne":
          res = {
            one: "bg-green-900 text-white-important",
            two: "bg-green-900 text-black",
          };
          break;
        case "SimilarsTwo":
          res = {
            one: "bg-green-400 text-black",
            two: "bg-green-400 text-black",
          };
          break;
        case "SimilarsThree":
          res = {
            one: "bg-yellow text-black",
            two: "bg-yellow text-black",
          };
          break;
        case "SimilarsFour":
          res = {
            one: "bg-orange text-black",
            two: "bg-orange text-black",
          };
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
  },
  components: {
    AppFilterDate,
  },
  methods: {
    itemRowBackground(value) {
      if (value.bgColor != null) return value.bgColor;
      else return "";
    },
    nextPage() {
      this.pageNumber += 1;
      this.getDataCleaningDetails();
    },
    previousPage() {
      this.pageNumber -= 1;
      this.getDataCleaningDetails();
    },
    rowClick(item) {
      let values = this.records.find((x) => item.id === x.key.id).value;
      this.similars = values.filter(
        (x) => x.source != "اورژانس" && x.source != "هلال احمر"
      );
      this.emergencies = values.filter((x) => x.source == "اورژانس");
      this.redCrescents = values.filter((x) => x.source == "هلال احمر");
      if (this.similars != null && this.similars.length != 0) {
        this.dialog = true;
        this.selectedItem = item;
      }
    },
    getDataCleaningDetails() {
      let vm = this;
      vm.isLoadingData = true;
      // const { sortBy, sortDesc, page, itemsPerPage } = val;
      return this.$axios({
        method: "post",
        url: "DataCleaningReport/Details",
        data: {
          province: this.getProvinceID,
          actionName: vm.getDataCleaningDetail.action.actionName,
          incidentInjuryType: vm.getDataCleaningDetail.incidentInjuryType,
          startTime: vm.getFilters.startTime,
          endTime: vm.getFilters.endTime,
          take: 20,
          skip: (this.pageNumber - 1) * 20,
        },
      })
        .then(
          (response) =>
            (vm.records = response.data.detail.records.map((x) => {
              let datetime = this.$convertToDateTime(
                x.key.hisDate,
                x.key.hisTime
              );
              x.key.hisDate = datetime.date;
              x.key.hisTime = datetime.time;
              x.key.deadCount =
                x.key.deadCount == null ? "نامشخص" : x.key.deadCount;
              x.key.injuredCount =
                x.key.injuredCount == null ? "نامشخص" : x.key.injuredCount;
              x.value.forEach((y) => {
                let datetime2 = this.$convertToDateTime(y.hisDate, y.hisTime);
                y.hisDate = datetime2.date;
                y.hisTime = datetime2.time;
                y.deadCount = y.deadCount == null ? "نامشخص" : y.deadCount;
                y.injuredCount =
                  y.injuredCount == null ? "نامشخص" : y.injuredCount;
              });
              return x;
            }))
        )
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

.text-white-important {
  color: white !important;
}
</style>