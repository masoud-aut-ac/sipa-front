<template>
  <div
    class="bg-white rounded-lg p-1 shadow-md"
    style="z-index: 510; direction: rtl"
  >
    <div class="flex items-stretch m-2 mt-3">
      <span><v-icon color="#FFA000">mdi-calendar-month</v-icon></span>
      <p class="pr-2">از</p>
      <input
        class="px-2 cursor-pointer"
        style="direction: rtl; width: 5.2rem"
        v-model="startDate"
        id="my-date-input-start"
      />
      <datePicker
        v-model="startDate"
        color="#FFA000"
        element="my-date-input-start"
      ></datePicker>
      <p>تا</p>
      <input
        class="px-2 cursor-pointer"
        style="direction: rtl; width: 5.2rem"
        v-model="endDate"
        id="my-date-input-end"
      />
      <datePicker
        v-model="endDate"
        color="#FFA000"
        element="my-date-input-end"
      ></datePicker>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
  props: {
    onUpdateDate: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      startDate: "1398/01/01",
      endDate: "1398/12/29",
    };
  },
  computed: {
    ...mapGetters({
      getStartDate: "filters/getStartDate",
      getEndDate: "filters/getEndDate",
    }),
  },
  components: {
    datePicker: VuePersianDatetimePicker,
  },
  methods: {
    ...mapMutations({
      setStartDate: "filters/setStartDate",
      setEndDate: "filters/setEndDate",
    }),
  },
  created() {
    this.startDate = this.getStartDate;
    this.endDate = this.getEndDate;
  },
  watch: {
    startDate(val) {
      this.setStartDate(val);
      this.onUpdateDate();
    },
    endDate(val) {
      this.setEndDate(val);
      this.onUpdateDate();
    },
  },
};
</script>

<style>
.vpd-month-label {
  width: 110px !important;
}
.vpd-dir-rtl .vpd-next {
  padding-right: 40px !important;
  padding-left: 20px !important;
}
</style>