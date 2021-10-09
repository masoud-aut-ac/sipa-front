<template>
  <div class="bg-gray-200 rounded-lg p-4 mb-4 font-serif">
    <p class="mb-4">انتخاب سال</p>
    <div class="flex m-1">
      <button
        v-for="t in years"
        :key="t.id"
        class="
          p-2
          flex-1
          bg-gray-100
          transition
          duration-100
          ease-in-out
          transform
          hover:scale-110
          hover:shadow-sm
          border-2 border-gray-200
        "
        style="border: 2px solid #e0daee"
        :class="{ selected: t.isSelected }"
        @click="t.isSelected = !t.isSelected"
      >
        {{ t.text }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      text: "1398",
      years: [
        { id: 0, text: "1398", isSelected: false },
        { id: 1, text: "1399", isSelected: false },
        { id: 2, text: "1400", isSelected: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
      getStartDate: "filters/getStartDate",
      getEndDate: "filters/getEndDate",
    }),
  },
  methods: {
    ...mapMutations({
      setYear: "index/setYear",
      setStartDate: "filters/setStartDate",
      setEndDate: "filters/setEndDate",
    }),
    updateYears() {
      let selectedYears = this.years.filter((x) => x.isSelected === true);
      if (selectedYears.length !== 0) {
        this.setStartDate(selectedYears[0].text + "-01-01");
        this.setEndDate(
          selectedYears[selectedYears.length - 1].text + "-12-29"
        );
      } else {
        this.setStartDate("1398-01-01");
        this.setEndDate("1400-12-29");
      }
    },
  },
  beforeMount() {
    this.$nuxt.$on("update-sipa-general", () => {
      this.updateYears();
    });
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