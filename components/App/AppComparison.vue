<template>
  <div class="bg-gray-200 rounded-lg p-4 mb-4">
    <v-checkbox
      :input-value="hasComparison"
      @change="toggleHasComparison"
      label="مقایسه اطلاعات"
      color="#332A7C"
      hide-details
      dense
    ></v-checkbox>
    <div class="my-4 shadow-md">
      <div class="bg-orange-100 rounded-t">
        <selectvue
          :value="selectedFilter == null ? null : selectedFilter.label"
          @input="setFilterTypeId"
          :options="filterTypeOptions"
          :reduce="(option) => option.id"
          placeholder="مقایسه بر اساس..."
          dir="rtl"
          class="style-chooser"
          :disabled="!hasComparison"
        ></selectvue>
      </div>
      <div class="bg-white rounded-b" v-if="selectedFilter != null">
        <selectvue
          multiple
          :value="comparisonDetail != null ? comparisonDetail.values : null"
          @input="limiter"
          :options="selectedFilter.options"
          :label="'name'"
          :reduce="(label) => label.id"
          placeholder="انتخاب کنید"
          dir="rtl"
          class="style-chooser"
          :disabled="!hasComparison"
        ></selectvue>
      </div>
    </div>
    <p class="text-red text-xs" v-if="IsLimited">
      امکان مقایسه حداکثر برای 3 مورد وجود دارد
    </p>
    <!-- <v-btn
      :disabled="!hasComparison"
      :dark="hasComparison"
      block
      color="#332A7C"
      class="mt-4"
      @click="emitter()"
      >اعمال فیلتر</v-btn
    > -->
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    allowedFilterTypes: {
      type: Array,
    },
  },
  data() {
    return {
      IsLimited: false,
      filterTypeId: null,
    };
  },
  computed: {
    ...mapGetters({
      hasComparison: "filters/getHasComparison",
      comparisonDetail: "filters/getComparisonDetail",
      removedFilterIds: "filters/getRemovedFilterIds",
      allFilters: "filters/getFilterDetails",
      getProvince: "filters/getProvince",
    }),
    filterTypeOptions() {
      let removedFilters = this.removedFilterIds;
      let res = this.allFilters.filter(
        (x) => !removedFilters.some((y) => x.id === y)
      );
      res = res.filter((x) =>
        this.allowedFilterTypes.some((y) => x.englishLabel === y)
      );
      return res;
    },
    selectedFilter() {
      let vm = this;
      return this.allFilters.find((x) => x.id === vm.filterTypeId);
    },
  },
  components: {
    selectvue: vSelect,
  },
  created() {
    this.filterTypeId =
      this.comparisonDetail != null ? this.comparisonDetail.filterId : null;
  },
  methods: {
    ...mapMutations({
      setHasComparison: "filters/setHasComparison",
      setComparisonDetail: "filters/setComparisonDetail",
      addRemovedFilterIds: "filters/addRemovedFilterIds",
      deleteRemovedFilterIds: "filters/deleteRemovedFilterIds",
      setCity: "filters/setCity",
    }),
    emitter() {
      this.$nuxt.$emit("update-sipa-charts");
    },
    limiter(e) {
      if (e.length > 3) {
        this.IsLimited = true;
        console.log(" you can only select two", e);
        e.pop();
      } else {
        this.setComparisonDetail({ filterId: this.filterTypeId, values: e });
        this.IsLimited = false;
      }
    },
    toggleHasComparison(val) {
      if (val) {
        this.setHasComparison(val);
      } else {
        this.setHasComparison(val);
        this.deleteRemovedFilterIds(this.filterTypeId);
        this.setComparisonDetail(null);
        this.filterTypeId = null;
      }
    },
    setFilterTypeId(val) {
      this.setComparisonDetail(null);
      if (this.filterTypeId !== null) {
        this.deleteRemovedFilterIds(this.filterTypeId);
      }
      if (val === null) {
        this.deleteRemovedFilterIds(this.filterTypeId);
        this.filterTypeId = val;
      } else {
        this.filterTypeId = val;
        this.addRemovedFilterIds(val);
        this.setComparisonDetail({ filterId: val });
      }
    },
  },
  watch: {
    getProvince(val) {
      if (
        val == null &&
        this.comparisonDetail !== null &&
        this.comparisonDetail.filterId === 5
      ) {
        this.setHasComparison(false);
        this.deleteRemovedFilterIds(this.filterTypeId);
        this.setComparisonDetail(null);
        this.filterTypeId = null;
      }
    },
  },
};
</script>

<style>
.v-input--selection-controls {
  margin-top: 0 !important;
}
.v-label {
  font-size: 0.875rem !important;
}
</style>
