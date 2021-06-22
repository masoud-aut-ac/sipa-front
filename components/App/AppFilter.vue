<template>
  <div class="bg-gray-200 rounded-lg p-4 mb-4">
    <p>فیلتر اطلاعات</p>
    <AppFilterSingle
      :filterTypeId="getRemovedFilterIds[i - 1]"
      v-for="i in countOfFilters"
      :key="i"
    />
    <v-btn
      class="my-2"
      fab
      :dark="counter < 8"
      x-small
      color="#332A7C"
      @click="counter++"
      :disabled="counter > 8"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
    <!-- <v-btn
      :disabled="hasComparison"
      :dark="!hasComparison"
      block
      color="#332A7C"
      class="mt-4"
      @click="emitter()"
      >جستجو</v-btn
    > -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppFilterSingle from "~/components/App/AppFilterSingle.vue";
import LoadingFilters from "~/mixins/LoadingFilters.js";

export default {
    mixins: [LoadingFilters],
  data() {
    return {
      counter: 1,
    };
  },
  components: {
    AppFilterSingle,
  },
  computed: {
    ...mapGetters({
      removedFilterIds: "filters/getRemovedFilterIds",
      comparisonDetail: "filters/getComparisonDetail",
      hasComparison: "filters/getHasComparison",
    }),
    countOfFilters() {
      if (this.getRemovedFilterIds.length + 1 < this.counter)
        this.counter = this.getRemovedFilterIds.length + 1;
      this.counter = this.counter > 1 ? this.counter : 1;
      return this.counter;
    },
    getRemovedFilterIds() {
      let res = this.removedFilterIds;
      if (this.comparisonDetail != null) {
        res = this.removedFilterIds.filter(
          (x) => x !== this.comparisonDetail.filterId
        );
      }
      return res;
    },
  },
  methods: {
    emitter() {
      this.$nuxt.$emit("update-sipa-charts");
    },
  },
  created() {
    this.counter = this.removedFilterIds.length;
    this.loadAllFilters();
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
  background-color: rgb(173, 173, 173)!important
}
</style>