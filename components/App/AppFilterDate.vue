<template>
  <div
    class="bg-white rounded-lg p-2 shadow-md"

  >
    <div class="flex items-stretch m-2 mt-3">
      <span><v-icon color="#FFA000">mdi-calendar-month</v-icon></span>
      <input class="px-2" style="direction:rtl" v-model="date" id="my-custom-input" />
      <datePicker
        v-model="date"
        popover
        range
        color="#FFA000"
        element="my-custom-input"
      ></datePicker>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
  data() {
    return {
      date: ["1398/01/01", "1398/12/29"],
    };
  },
  computed: {
    ...mapGetters({
      getDate: "filters/getDate",
    }),
  },
  components: {
    datePicker: VuePersianDatetimePicker,
  },
  methods: {
    ...mapMutations({
      setDate: "filters/setDate",
    }),
  },
  created() {
      this.date = this.getDate
  },
  watch: {
    date(val) {
      this.setDate(val);
    },
  },
};
</script>