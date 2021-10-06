<template>
  <div class="bg-white rounded-lg p-2 shadow-md" style="direction: rtl">
    <div class="flex items-stretch m-1">
      <span><v-icon color="#FFA000" class="mt-1">mdi-filter</v-icon></span>
      <p class="leading-8 mr-1">فیلترها</p>
      <div>
        <v-chip class="mr-1" v-for="(item, i) in selectedFilters" :key="i">
          {{ item.value.name + " " + item.chipLabel }}
        </v-chip>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!getSideSheet"
        fab
        dark
        x-small
        color="#332A7C"
        @click="toggleSideSheet"
      >
        <v-icon> mdi-tune-vertical-variant </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    allowedFilterTypes: {
      type: Array,
    },
  },
  data() {
    return {
      selectedFilters: [],
    };
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
      allFilters: "filters/getFilterDetails",
    }),
  },
  methods: {
    ...mapMutations({
      setSideSheet: "index/setSideSheet",
    }),
    toggleSideSheet() {
      this.setSideSheet(true);
    },
    updateSelectedFilters() {
      let vm = this;
      this.selectedFilters = vm.allFilters
        .filter((x) => x.value != null)
        .filter((x) => vm.allowedFilterTypes.some((y) => x.englishLabel === y))
        .map((x) => {
          let res = {
            chipLabel: x.labelChip,
            value: x.options.find((y) => y.id === x.value),
          };
          return res;
        });
    },
  },
  beforeMount() {
    this.$nuxt.$on("update-sipa-charts", () => {
      this.updateSelectedFilters();
    });
    this.$nuxt.$on("update-sipa-map", () => {
      this.updateSelectedFilters();
    });
    this.$nuxt.$on("update-sipa-general", () => {
      this.updateSelectedFilters();
    });
  },
};
</script>
<style>
.v-chip__close {
  margin-right: 12px !important;
}
.v-chip {
  margin-bottom: 2px;
  margin-top: 2px;
}
</style>