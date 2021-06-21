<template>
  <div class="bg-white rounded-lg p-2 shadow-md">
    <div class="flex items-stretch m-2">
      <span><v-icon color="#FFA000" class="mt-1">mdi-filter</v-icon></span>
      <p class="leading-8 mr-1 cursor-pointer">فیلترها</p>
      <div>
        <v-chip class="mr-1" v-for="(item, i) in selectedFilters" :key="i">
          {{ item.value.name + " " + item.chipLabel}}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
      allFilters: "filters/getFilterDetails",
    }),
    selectedFilters() {
      return this.allFilters
        .filter((x) => x.value != null)
        .map((x) => {
          return {
            chipLabel: x.labelChip,
            value: x.options.find((y) => y.id === x.value),
          };
        });
    },
  },
  methods: {
    ...mapMutations({
      setSideSheet: "index/setSideSheet",
    }),
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