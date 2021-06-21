<template>
  <div class="font-serif text-sm" style="direction: rtl">
    <div class="absolute top-8 mr-24 z-50">
      <AppFilterDate class="" />
    <div class="bg-orange-100 w-72 shadow-md rounded-lg mt-2">
      <selectvue
        v-model="mapType"
        :options="mapTypeOptions"
        label="Value"
        :reduce="(option) => option.Key"
        placeholder="انتخاب کنید"
        dir="rtl"
        class="style-chooser text-sm px-1"
        :clearable="false"
      ></selectvue>
    </div>
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
    };
  },
  components: {
    AppMap,
    AppFilterDate,
    selectvue: vSelect,
  },
  computed: {
    ...mapGetters({
      getMapID: "index/getMapID",
      getMapLevel: "index/getMapLevel",
    }),
  },
  methods: {
    ...mapMutations({
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
    this.mapType = this.getMapID;
    this.getMapList();
  },
  watch: {
    mapType(value) {
      this.setMapID(value);
    },
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

