<template>
  <div class="bg-gray-200 rounded-lg p-4 mb-4 font-serif">
    <p>فیلتر اطلاعات</p>
    <div>
      <AppFilterSingle
        :allowedFilterTypes="allowedFilterTypes"
        :filterTypeId="getRemovedFilterIds[i - 1]"
        v-for="i in countOfFilters"
        :key="i"
      />
      <v-btn
        class="my-2"
        fab
        :dark="counter < 8"
        x-small
        color="#fcc66b"
        @click="counter++"
        :disabled="counter > 8"
      >
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppFilterSingle from "~/components/App/AppFilterSingle.vue";
import LoadingFilters from "~/mixins/LoadingFilters.js";

export default {
  mixins: [LoadingFilters],
  props: {
    allowedFilterTypes: {
      type: Array,
    },
    isMapPage: {
      type: Boolean,
      default: false,
    },
    isGeneralPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      counter: 1,
      comboboxes: [],
    };
  },
  components: {
    AppFilterSingle,
  },
  computed: {
    ...mapGetters({
      allFilters: "filters/getFilterDetails",
      removedFilterIds: "filters/getRemovedFilterIds",
      comparisonDetail: "filters/getComparisonDetail",
      hasComparison: "filters/getHasComparison",
      getFilters: "filters/getFilters",
      getFilters: "filters/getFilters",
      getProvince: "filters/getProvince",
    }),
    countOfFilters() {
      if (this.getRemovedFilterIds.length + 1 < this.counter)
        this.counter = this.getRemovedFilterIds.length + 1;
      this.counter = this.counter > 1 ? this.counter : 1;
      return this.counter;
    },
    getRemovedFilterIds() {
      let r = [];
      this.removedFilterIds.forEach((x) => {
        let g = this.allFilters.find((y) => x === y.id);
        r.push(g);
      });
      this.comboboxes = this.comboboxes.filter((x) =>
        this.allowedFilterTypes.some((y) => x.englishLabel === y)
      );
      this.comboboxes = r.map((x) => x.id);

      // let res = this.allFilters
      //   .filter((x) =>
      //     this.allowedFilterTypes.some((y) => x.englishLabel === y)
      //   )
      //   .filter((x) => this.removedFilterIds.some((y) => x.id === y))
      //   .map((x) => x.id);
      if (this.comparisonDetail != null) {
        this.comboboxes = this.removedFilterIds.filter(
          (x) => x !== this.comparisonDetail.filterId
        );
      }
      return this.comboboxes;
    },
  },
  methods: {
    ...mapMutations({
      deleteRemovedFilterIds: "filters/deleteRemovedFilterIds",
    }),
  },
  created() {
    this.counter = this.removedFilterIds.length;
    this.loadAllFilters();
  },
  watch: {
    getProvince(val) {
      if (val === null) this.deleteRemovedFilterIds(5);
    },
  },
};
</script>

<style>
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter {
  transform: translateY(-100%);
  opacity: 0;
}
.v-btn:focus {
  outline: none !important;
}
.v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
  min-height: 28px !important;
  font-size: 14px !important;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgb(173, 173, 173) !important;
}
</style>