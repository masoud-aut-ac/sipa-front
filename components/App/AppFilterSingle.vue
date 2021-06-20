<template>
  <div class="my-4 shadow-md">
    <div class="bg-orange-100 rounded-t">
      <selectvue
        :value="
          filterTypeId != null ? filterTypeOptions[filterTypeId].label : null
        "
        @input="setFilterTypeId"
        :options="getFilterTypeOptions"
        :reduce="(option) => option.id"
        label="label"
        placeholder="نوع فیلتر را انتخاب کنید"
        dir="rtl"
        class="style-chooser"
      ></selectvue>
    </div>
    <div v-if="filterTypeId != null">
      <div
        class="bg-white rounded-b"
        v-if="filterTypeOptions[filterTypeId].inputType == 'select'"
      >
        <selectvue
          :value="filterTypeOptions[filterTypeId].value"
          @input="filterTypeOptions[filterTypeId].input"
          :options="filterTypeOptions[filterTypeId].options"
          :label="filterTypeId === 0 ? 'persianName' : 'name'"
          :reduce="(option) => option.id"
          placeholder="انتخاب کنید"
          dir="rtl"
          class="style-chooser"
        ></selectvue>
      </div>
      <div class="bg-white rounded-b" v-else>
        <v-text-field
          :value="filterTypeOptions[filterTypeId].value"
          @input="filterTypeOptions[filterTypeId].input"
          type="number"
          placeholder=" تایپ کنید"
          solo
          dense
          flat
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import LoadingFilters from "~/mixins/LoadingFilters.js";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  mixins: [LoadingFilters],
  props: {
    filterTypeId: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      hasLoadedFilters: "filters/getHasLoadedFilters",
      provinceSelected: "filters/getProvinceSelected",
      infoSourceSelected: "filters/getInfoSourceSelected",
      infoDeviceSelected: "filters/getInfoDeviceSelected",
      injuriesCountSelected: "filters/getInjuriesCountSelected",
      deadCountSelected: "filters/getDeadCountSelected",
      vehicleCountSelected: "filters/getVehicleCountSelected",
      vehicleTypeSelected: "filters/getVehicleTypeSelected",
      incidentTypeSelected: "filters/getIncidentTypeSelected",
      incidentPartSelected: "filters/getIncidentPartSelected",
      incidentReasonSelected: "filters/getIncidentReasonSelected",
      provinces: "filters/getProvinces",
      infoSources: "filters/getInfoSources",
      infoDevices: "filters/getInfoDevices",
      vehicleTypes: "filters/getVehicleTypes",
      incidentTypes: "filters/getIncidentTypes",
      incidentParts: "filters/getIncidentParts",
      incidentReasons: "filters/getIncidentReasons",
      removedFilterIds: "filters/getRemovedFilterIds",
    }),
    filterTypeOptions() {
      return [
        {
          id: 0,
          label: "مکان",
          inputType: "select",
          value: this.provinceSelected,
          options: this.provinces,
          input: (val) => this.setProvinceSelected(val),
        },
        {
          id: 1,
          label: "منبع دریافت پیام",
          inputType: "select",
          value: this.infoSourceSelected,
          options: this.infoSources,
          input: (val) => this.setInfoSourceSelected(val),
        },
        {
          id: 2,
          label: "وسیله دریافت پیام",
          inputType: "select",
          value: this.infoDeviceSelected,
          options: this.infoDevices,
          input: (val) => this.setInfoDeviceSelected(val),
        },
        {
          id: 3,
          label: "تعداد مجروحان هر تصادف",
          inputType: "number",
          value: this.injuriesCountSelected,
          input: (val) => this.setInjuriesCountSelected(val),
        },
        {
          id: 4,
          label: "تعداد فوتی‌های هر تصادف",
          inputType: "number",
          value: this.deadCountSelected,
          input: (val) => this.setDeadCountSelected(val),
        },
        {
          id: 5,
          label: "تعداد وسایل در هر تصادف",
          inputType: "number",
          value: this.vehicleCountSelected,
          input: (val) => this.setVehicleCountSelected(val),
        },
        {
          id: 6,
          label: "انواع وسایل در هر تصادف",
          inputType: "select",
          value: this.vehicleTypeSelected,
          options: this.vehicleTypes,
          input: (val) => this.setVehicleTypeSelected(val),
        },
        {
          id: 7,
          label: "انواع برخورد",
          inputType: "select",
          value: this.incidentTypeSelected,
          options: this.incidentTypes,
          input: (val) => this.setIncidentTypeSelected(val),
        },
        {
          id: 8,
          label: "شکل برخورد",
          inputType: "select",
          value: this.incidentPartSelected,
          options: this.incidentParts,
          input: (val) => this.setIncidentPartSelected(val),
        },
        {
          id: 9,
          label: "علت تامه تصادف",
          inputType: "select",
          value: this.incidentReasonSelected,
          options: this.incidentReasons,
          input: (val) => this.setIncidentReasonSelected(val),
        },
      ];
    },
    getFilterTypeOptions() {
      let res = this.filterTypeOptions.filter(
        (x) => !this.removedFilterIds.some((y) => y === x.id)
      );
      return res;
    },
  },
  components: {
    selectvue: vSelect,
  },
  methods: {
    ...mapMutations({
      setHasLoadedFilters: "filters/setHasLoadedFilters",
      setProvinceSelected: "filters/setProvinceSelected",
      setInfoSourceSelected: "filters/setInfoSourceSelected",
      setInfoDeviceSelected: "filters/setInfoDeviceSelected",
      setInjuriesCountSelected: "filters/setInjuriesCountSelected",
      setDeadCountSelected: "filters/setDeadCountSelected",
      setVehicleCountSelected: "filters/setVehicleCountSelected",
      setVehicleTypeSelected: "filters/setVehicleTypeSelected",
      setIncidentTypeSelected: "filters/setIncidentTypeSelected",
      setIncidentPartSelected: "filters/setIncidentPartSelected",
      setIncidentReasonSelected: "filters/setIncidentReasonSelected",
      addRemovedFilterIds: "filters/addRemovedFilterIds",
      deleteRemovedFilterIds: "filters/deleteRemovedFilterIds",
    }),
    setFilterTypeId(val) {
      if (this.filterTypeId !== null)
        this.deleteRemovedFilterIds(this.filterTypeId);
      if (val === null) {
        this.deleteRemovedFilterIds(this.filterTypeId);
        this.filterTypeOptions[this.filterTypeId].input(null);
        this.filterTypeId = val;
      } else {
        this.filterTypeId = val;
        this.addRemovedFilterIds(val);
      }
    },
  },
  created() {
    if (!this.hasLoadedFilters) this.loadAllFilters();
  },
};
</script>

<style>
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
.v-text-field__details {
  display: none !important;
}
</style>