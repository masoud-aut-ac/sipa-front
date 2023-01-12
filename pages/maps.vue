<template>
  <div class="font-serif text-sm" style="direction: rtl">
    <div class="absolute top-2 mr-20 z-40 gap-3">
      <div class="col-span-9 lg:col-span-3">
        <AppFilterDate class="my-2" :onUpdateDate="this.updateSipaMap" />
        <AppMapLevelSwitch class="my-2" />
        <AppMapIndexSwitch class="my-2" />
        <AppMapDensitySwitch v-show="getIndex != 0" class="my-2" />
        <AppAggregationTypeSwitch class="my-2" />
        <AppFilterChips
          class="my-2 max-w-xs"
          :allowedFilterTypes="allowedFilterTypes"
        />
      </div>
    </div>
    <div
      v-if="this.getSideSheet"
      class="absolute top-0 left-0 w-80 overflow-auto h-screen z-40"
    >
      <AppSearchInfo
        :allowedFilterTypes="allowedFilterTypes"
        :onUpdateFilters="this.updateSipaMap"
      />
    </div>
    <AppMap />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppMap from "~/components/App/AppMap.vue";
import AppFilterDate from "~/components/App/AppFilterDate.vue";
import AppFilterChips from "~/components/App/AppFilterChips.vue";
import AppAggregationTypeSwitch from "~/components/App/AppMap/AppAggregationTypeSwitch.vue";
import AppMapLevelSwitch from "~/components/App/AppMap/AppMapLevelSwitch.vue";
import AppMapIndexSwitch from "~/components/App/AppMap/AppMapIndexSwitch.vue";
import AppMapDensitySwitch from "~/components/App/AppMap/AppMapDensitySwitch.vue";
import "vue-select/dist/vue-select.css";

export default {
  middleware: "auth",
  data() {
    return {
      mapType: null,
      mapTypeOptions: [],
    };
  },
  components: {
    AppMap,
    AppFilterDate,
    AppFilterChips,
    AppAggregationTypeSwitch,
    AppMapLevelSwitch,
    AppMapIndexSwitch,
    AppMapDensitySwitch,
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
      getFilters: "filters/getFilters",
      getMapLevel: "index/getMapLevel",
      getIndex: "index/getIndex",
    }),
    allowedFilterTypes() {
      let res = [
        "infoSource",
        "infoDevice",
        "vehicleType",
        "incidentType",
        "incidentPart",
        "incidentReason",
        "incidentInjuriesType",
      ];
      if (this.getMapLevel != 0) res.push("province");
      if (this.getMapLevel == 2 && this.getFilters.province !== null)
        res.push("city");
      return res;
    },
  },
  methods: {
    getMapList() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "MapsList",
      }).then((response) => {
        vm.mapTypeOptions = response.data.detail.availableMaps;
      });
    },
    updateSipaMap() {
      this.$nuxt.$emit("update-sipa-map");
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

