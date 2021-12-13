<template>
  <div class="bg-white rounded-lg shadow-md p-2 font-serif">
    <div class="flex">
      <!-- <v-icon color="#FFA000" class="ml-2">mdi-poll</v-icon> -->
      <button
        v-for="t in mapTypes"
        :key="t.id"
        class="
          p-2
          flex-1
          bg-gray-100
          text-xs
          transition
          duration-100
          ease-in-out
          transform
          hover:scale-110
          hover:shadow-sm
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
      mapTypes: [
        { id: 0, text: "تعداد", isSelected: false },
        { id: 1, text: "تراکم", isSelected: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getIndexType: "index/getIndexType",
    }),
  },
  methods: {
    selectType(id) {
      this.mapTypes.forEach((y) => (y.isSelected = false));
      this.mapTypes.find((y) => y.id === id).isSelected = true;
      this.setIndexType(id);
    },
    ...mapMutations({
      setIndexType: "index/setIndexType",
    }),
  },
  created() {
    this.mapTypes.find((x) => x.id === this.getIndexType).isSelected = true;
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