<template>
  <div class="bg-white rounded-lg p-2 shadow-md font-serif">
    <div class="bg-gray-100 rounded-t">
      <selectvue
        :value="selectedAggregation == null ? null : selectedAggregation.text"
        @input="selectType"
        :clearable="false"
        :options="aggregations"
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
      aggregations: [
        { id: 0, text: "تصادف معادل", isSelected: false },
        { id: 1, text: "تصادف فوتی", isSelected: false },
        { id: 2, text: "تصادف جرحی", isSelected: false },
        { id: 3, text: "مجروح", isSelected: false },
        { id: 4, text: "متوفی", isSelected: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getAggregationType: "index/getAggregationType",
    }),
    selectedAggregation(){
      return this.aggregations.find(x=> x.isSelected)
    }
  },
  components: {
    selectvue: vSelect,
  },
  methods: {
    selectType(id) {
      this.aggregations.forEach((y) => (y.isSelected = false));
      this.aggregations.find((y) => y.id === id).isSelected = true;
      this.setAggregationType(id);
    },
    ...mapMutations({
      setAggregationType: "index/setAggregationType",
    }),
  },
  created() {
    this.aggregations.find((x) => x.id === this.getAggregationType).isSelected = true;
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