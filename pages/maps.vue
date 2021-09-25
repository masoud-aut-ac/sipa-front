<template>
  <div class="font-serif text-sm" style="direction: rtl">
    <div class="absolute top-2 mr-20 z-50 gap-3">
      <div class="col-span-9 lg:col-span-3">
        <AppFilterDate class="my-2" />
        <AppMapLevelSwitch class="my-2" />
        <AppMapIDSwitch class="my-2" />
        <AppFilterChips class="my-2 max-w-xs" :allowedFilterTypes="allowedFilterTypes" />
      </div>
    </div>
    <div
      v-if="this.getSideSheet"
      class="absolute top-0 left-0 w-80 overflow-auto h-screen z-40"
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
import { mapGetters } from "vuex";
import AppMap from "~/components/App/AppMap.vue";
import AppFilterDate from "~/components/App/AppFilterDate.vue";
import "vue-select/dist/vue-select.css";

export default {
  middleware: "auth",
  data() {
    return {
      mapType: null,
      mapTypeOptions: [],
      allowedFilterTypes: [
        "province",
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
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
    }),
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

