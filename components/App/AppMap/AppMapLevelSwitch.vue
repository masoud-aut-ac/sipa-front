<template>
  <div class="bg-white rounded-lg shadow-md p-2 font-serif">
    <div class="flex">
      <!-- <v-icon color="#FFA000" class="ml-2">mdi-map</v-icon> -->
      <button
        v-for="t in mapLevels"
        :key="t.id"
        class="
          py-2
          px-2
          flex-1
          bg-gray-100
          text-xs
          transition
          duration-100
          ease-in-out
          transform
          hover:scale-110 hover:shadow-sm
        "
        :class="{ selected: t.isSelected }"
        @click="selectType(t.id)"
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
      mapLevels: [
        { id: 0, text: "استان‌ها", isSelected: false },
        { id: 1, text: "شهرستان‌ها", isSelected: false },
        { id: 2, text: "محورها", isSelected: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getIndex: "index/getIndex",
      getMapLevel: "index/getMapLevel",
    }),
  },
  methods: {
    selectType(id) {
      if (this.getMapLevel === 2 && this.getIndex === 2 && id !== 2)
        this.setIndex(1);
      this.mapLevels.forEach((y) => (y.isSelected = false));
      this.mapLevels.find((y) => y.id === id).isSelected = true;
      this.setMapLevel(id);
    },
    ...mapMutations({
      setMapLevel: "index/setMapLevel",
      setIndex: "index/setIndex",
    }),
  },
  created() {
    this.mapLevels.find((x) => x.id === this.getMapLevel).isSelected = true;
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