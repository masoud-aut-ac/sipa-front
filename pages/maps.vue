<template>
  <div class="font-serif text-sm" style="direction: rtl">
    <div class="absolute top-2 mr-20 z-50 grid grid-cols-12 gap-3">
      <div class="col-span-9 lg:col-span-3">
        <AppFilterDate class="my-2" />
        <AppFilterChips class="my-2" :allowedFilterTypes="allowedFilterTypes" />
        <AppMapTypeSwitch class="my-2" />
      </div>
      <div class="col-span-3 lg:col-span-9"></div>
      <!-- <v-btn
        v-if="!getSideSheet"
        fab
        dark
        x-small
        color="#332A7C"
        class="mx-2"
        title="فیلتر اطلاعات"
        @click="setSideSheet(true)"
      >
        <v-icon> mdi-tune-vertical-variant </v-icon>
      </v-btn> -->
    </div>
    <div
      v-if="this.getSideSheet"
      class="absolute top-0 left-0 w-80 overflow-auto h-screen z-50"
    >
      <AppSearchInfo
        :allowedFilterTypes="allowedFilterTypes"
        :isMapPage="true"
      />
    </div>
    <AppMap />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppMap from "~/components/App/AppMap.vue";
import AppFilterDate from "~/components/App/AppFilterDate.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  middleware: "auth",
  data() {
    return {
      mapType: null,
      mapTypeOptions: [],
      allowedFilterTypes: [
        "infoSource",
        "infoDevice",
        "vehicleType",
        "incidentType",
        "incidentPart",
        "incidentReason",
      ],
    };
  },
  components: {
    AppMap,
    AppFilterDate,
    selectvue: vSelect,
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
      getMapID: "index/getMapID",
      getMapLevel: "index/getMapLevel",
      allFilters: "filters/getFilterDetails",
    }),
  },
  methods: {
    ...mapMutations({
      setSideSheet: "index/setSideSheet",
      setMapID: "index/setMapID",
    }),
    getMapList() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "MapsList",
      }).then((response) => {
        vm.mapTypeOptions = response.data.detail.availableMaps;
      });
    },
  },
  created() {
    this.getMapList();
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
.style-chooser .vs__search::placeholder {
  color: black;
}
.style-chooser .vs__search {
  color: black;
}
.style-chooser .vs__dropdown-toggle {
  padding: 5px 0 5px 0;
  border: none;
}
</style>

