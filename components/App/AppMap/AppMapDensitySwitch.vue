<template>
  <div class="bg-white rounded-lg shadow-md p-2 font-serif">
    <div class="bg-gray-100 rounded-t">
      <selectvue
        :value="selectedDensity == null ? null : selectedDensity.text"
        @input="selectType"
        :clearable="false"
        :options="densityTypes"
        :reduce="(option) => option.id"
        label="text"
        placeholder="نوع فیلتر را انتخاب کنید"
        dir="rtl"
        class="style-chooser text-sm"
      ></selectvue>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import vSelect from "vue-select";

export default {
  data() {
    return {
      densityTypes: [
        { id: 0, text: "طول", isSelected: false },
        { id: 1, text: "وسیله کیلومتر", isSelected: false },
        { id: 2, text: "سهم وسایل سنگین", isSelected: false },
        { id: 3, text: "سرعت متوسط", isSelected: false },
      ],
    };
  },
  components: {
    selectvue: vSelect,
  },
  computed: {
    ...mapGetters({
      getDensityType: "index/getDensityType",
    }),
    selectedDensity() {
      return this.densityTypes.find((x) => x.isSelected);
    },
  },
  methods: {
    selectType(id) {
      this.densityTypes.forEach((y) => (y.isSelected = false));
      this.densityTypes.find((y) => y.id === id).isSelected = true;
      this.setDensityType(id);
    },
    ...mapMutations({
      setDensityType: "index/setDensityType",
    }),
  },
  created() {
    this.densityTypes.find(
      (x) => x.id === this.getDensityType
    ).isSelected = true;
  },
};
</script>

<style>
.selected {
  background-color: #fcc66b;
}
button:focus {
  outline: none;
}
</style>