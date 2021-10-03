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
          border-2
          border-gray-200
        "
        style="border: 2px solid #e0daee"
        :class="{ selected: t.isSelected }"
        @click="selectYear(t.id)"
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
      getYear: "index/getYear",
    }),
  },
  methods: {
    ...mapMutations({
      setYear: "index/setYear",
    }),
    selectYear(id) {
      this.years.forEach((y) => (y.isSelected = false));
      this.years.find((y) => y.id === id).isSelected = true;
      this.setYear(id);
    },
  },
  created() {
    this.years.find((x) => x.id === this.getYear).isSelected = true;
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