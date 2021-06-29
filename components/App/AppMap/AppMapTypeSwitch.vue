<template>
  <div class="bg-white rounded-lg p-1 shadow-md my-2 p-2 font-serif">
    <button
      v-for="t in mapTypes"
      :key="t.id"
      class="p-2 px-3 bg-gray-100 text-xs transition duration-100 ease-in-out transform hover:scale-110 hover:shadow-sm"
      :class="{ selected: t.isSelected }"
      @click="selectType(t.id)"
    >
      {{ t.text }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapTypes: [
        { id: 0, text: "تعداد تصادف", isSelected: true },
        { id: 1, text: "تعداد مجروح", isSelected: false },
        { id: 2, text: "تعداد فوتی", isSelected: false },
      ],
    };
  },
  methods: {
    selectType(id) {
      this.mapTypes.forEach((y) => (y.isSelected = false));
      this.mapTypes.find((y) => y.id === id).isSelected = true;
    },
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