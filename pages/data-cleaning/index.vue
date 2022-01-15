<template>
  <div class="mr-20 text-sm max-h-screen" style="direction: rtl">
    <div class="mt-4 mb-7 ml-4">
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
      <v-progress-circular
        v-if="isLoadingData"
        :size="60"
        :width="4"
        indeterminate
        style="margin: 15% 45%"
        color="#FFA000"
      ></v-progress-circular>
      <div v-else class="pb-8">
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
                @click="showSimilars()"
                >{{
                  "تصادفات غیرخسارتی: " + action.countInjuredAccidents
                }}</v-btn
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
                @click="showSimilars()"
                >{{ "تصادفات فوتی: " + action.countDeadAccidents }}</v-btn
              >
            </div>
          </div>
        </div>
      </div>
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
    };
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
    }),
  },
  components: {
    AppFilterDate,
    selectvue: vSelect,
  },
  methods: {
    ...mapMutations({
      setSimilarityID: "index/setSimilarityID",
    }),
    showSimilars() {
      // this.$router.push("/similarity/details");
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
        .then((response) => (vm.groups = response.data.detail.groups))
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