<template>
  <div class="mr-20 text-sm max-h-screen" style="direction: rtl">
    <div class="mt-4 mb-7 ml-4">
      <AppFilterDate :onUpdateDate="this.updateSipaDataEntryHistory" class="pt-2" />
      <div class="bg-white rounded-lg shadow mt-4 p-4">
        <div class="flex">
          <v-icon x-small color="#FFA000" class="ml-2">mdi-circle</v-icon>
          <p>جدول تاریخچه ورود اطلاعات</p>
        </div>
        <v-progress-circular
          v-if="isLoadingData"
          :size="60"
          :width="4"
          indeterminate
          style="margin: 15% 45%"
          color="#FFA000"
        ></v-progress-circular>
        <!-- Start of table -->
        <div v-else>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="جستجو"
            single-line
            hide-details
            reverse
          ></v-text-field>
          <v-data-table
            light
            :headers="headers"
            :items="recordsComputed"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :search="search"
            hide-default-footer
            class="sipa-table-row shadow mt-4"
            @page-count="pageCount = $event"
            @click:row="rowClick"
          ></v-data-table>
          <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="5"
              color="#e0daee"
              prev-icon="mdi-chevron-right"
              next-icon="mdi-chevron-left"
            ></v-pagination>
          </div>
        </div>
        <!-- End of table -->
        <!-- start of nulls dialog -->
        <v-dialog light v-model="showDetails" width="400px">
          <div class="bg-white rounded text-right" style="direction: rtl">
            <v-btn icon @click="showDetails = false" class="mx-2"
              ><v-icon>mdi-close</v-icon></v-btn
            >
            <div class="p-4">
              <div class="flex">
                <v-icon x-small color="#FFA000" class="ml-2">mdi-circle</v-icon>
                <p>تعداد رکوردهای خالی</p>
              </div>
              <v-divider class="mt-2 mb-4"></v-divider>

              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.latitudeNullsCount }}
                </p>
                <p>طول جغرافیایی</p>
              </div>
              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.longitudeNullsCount }}
                </p>
                <p>عرض جغرافیایی</p>
              </div>
              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.hisDateNullsCount }}
                </p>
                <p>تاریخ</p>
              </div>
              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.hisTimeNullsCount }}
                </p>
                <p>ساعت</p>
              </div>
              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.injuredNullsCount }}
                </p>
                <p>تعداد مجروح</p>
              </div>
              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.deadNullsCount }}
                </p>
                <p>تعداد فوتی</p>
              </div>
              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.provinceNullsCount }}
                </p>
                <p>استان</p>
              </div>
              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.incidentTypeNullsCount }}
                </p>
                <p>نوع برخورد</p>
              </div>
              <div class="flex my-1">
                <p class="text-lg font-bold mx-2">
                  {{ selectedItem.incidentPartNullsCount }}
                </p>
                <p>شکل برخورد</p>
              </div>
            </div>
          </div>
        </v-dialog>
        <!-- End of null dialog -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppTableMain from "~/components/App/AppTable/AppTableMain.vue";

export default {
  middleware: "auth",
  data() {
    return {
      isLoadingData: false,
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      showDetails: false,
      records: [],
      selectedItem: {
        latitudeNullsCount: "",
        latitudeNullsCount: "",
        hisDateNullsCount: "",
        hisTimeNullsCount: "",
        deadNullsCount: "",
        injuredNullsCount: "",
        provinceNullsCount: "",
        incidentTypeNullsCount: "",
        incidentPartNullsCount: "",
      },
      headers: [
        {
          text: "تاریخ و ساعت ورود اطلاعات",
          align: "center",
          sortable: false,
          value: "dateTime",
          class: "bg-blue",
        },
        {
          text: "منبع اطلاعاتی",
          sortable: false,
          align: "center",
          value: "sourcePersianName",
          class: "bg-blue",
        },
        {
          text: "تعداد رکورد",
          align: "center",
          value: "count",
          class: "bg-blue",
        },
        {
          text: "تعداد رکورد تکراری",
          align: "center",
          value: "countOfDuplicates",
          class: "bg-blue",
        },
        {
          text: "اولین تاریخ ثبت شده",
          sortable: false,
          align: "center",
          value: "firstHisDate",
          class: "bg-blue",
        },
        {
          text: "آخرین تاریخ ثبت شده",
          sortable: false,
          align: "center",
          value: "lastHisDate",
          class: "bg-blue",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
    }),
    recordsComputed() {
      this.records.forEach(
        (x) => (x.dateTime = x.dateTime.replaceAll("-", "/").slice(0, 16))
      );
      this.records.forEach(
        (x) => (x.firstHisDate = x.firstHisDate.replaceAll("-", "/"))
      );
      this.records.forEach(
        (x) => (x.lastHisDate = x.lastHisDate.replaceAll("-", "/"))
      );
      return this.records;
    },
  },
  components: {
    AppTableMain,
  },
  methods: {
    rowClick(item) {
      this.selectedItem = item;
      this.showDetails = true;
    },
    getInsertionHistory() {
      let vm = this;
      vm.isLoadingData = true;
      return this.$axios({
        method: "post",
        url: "InsertionHistory",
        data: {
          startTime: vm.getFilters.startTime,
          endTime: vm.getFilters.endTime,
        },
      })
        .then((response) => (vm.records = response.data.detail.records))
        .then((res) => (vm.isLoadingData = false));
    },
    updateSipaDataEntryHistory(){
      this.$nuxt.$emit("update-sipa-data-entry-history");
      this.getInsertionHistory();
    }
  },
};
</script>

<style>
.sipa-table-row th {
  color: white!important;
}
.sipa-table-row tr:hover {
  cursor: pointer;
}
.v-data-table-header-mobile {
  display: none !important;
}
.theme--light.v-pagination .v-pagination__item--active {
  color: black;
}
.v-pagination__item:focus {
  outline: none;
}
.v-pagination__item--active:focus {
  outline: none;
}
</style>


