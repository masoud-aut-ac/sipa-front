<template>
  <div class="bg-white rounded-lg p-6 shadow-md">
    <div class="flex items-stretch m-2">
      <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
      <p class="mr-2">{{ title }}</p>
    </div>
    <v-progress-circular
      v-if="isLoadingData"
      :size="40"
      :width="4"
      indeterminate
      style="margin: 25% 45%"
      color="#FFA000"
    ></v-progress-circular>
    <div v-else>
      <app-chart-column
        :graphData="graphSlices"
        :compareTitles="compareTitles"
        v-if="chartMode === 'Column'"
      />
      <template v-else>
        <app-chart-pie
          :graphData="graphSlices[i]"
          :compareTitle="compareTitles[i]"
          v-for="(item, i) in graphSlices"
          :key="i"
        />
      </template>
    </div>
  </div>
</template>

<script>
import AppChartColumn from "~/components/App/AppChart/AppChartColumn.vue";
import AppChartPie from "~/components/App/AppChart/AppChartPie.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    graphCategory: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    chartMode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      graphSlices: [],
      compareTitles: [],
      requestID: null,
      isLoadingData: true,
    };
  },
  components: {
    AppChartColumn,
    AppChartPie,
  },
  methods: {
    fetchChartData() {
      this.isLoadingData = true;
      this.graphSlices = [];
      let myRequestID = Math.random();
      this.requestID = myRequestID;
      let vm = this;
      const bodies = this.apiRequestBodies;
      bodies.forEach((b) => {
        vm.$axios({
          method: "post",
          url: "GraphData",
          data: b,
        })
          .then((res) => {
            if (myRequestID === vm.requestID) {
              let slices = res.data.detail.graphSlices;
              slices = slices.map((x) => {
                // return { name: x.name, y: x.percent };
                return [x.name, x.percent < 1.0 ? 0 : x.percent];
              });
              vm.graphSlices.push({ slices });
            }
          })
          .then((r) => (this.isLoadingData = false));
      });
    },
    updateCompareTitles() {
      if (
        this.hasComparison &&
        this.comparisonDetail != null &&
        this.comparisonDetail.values != null &&
        this.comparisonDetail.values[0] != null
      ) {
        let compareFilter = this.allFilters.find(
          (x) => x.id === this.comparisonDetail.filterId
        );
        this.comparisonDetail.values.forEach((x) => {
          let item = compareFilter.options.find((y) => y.id === x);
          this.compareTitles.push(item.name);
        });
      }
      return this.compareTitles;
    },
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
      hasComparison: "filters/getHasComparison",
      comparisonDetail: "filters/getComparisonDetail",
      allFilters: "filters/getFilterDetails",
    }),
    apiRequestBodies() {
      let res = [];
      if (
        this.hasComparison &&
        this.comparisonDetail != null &&
        this.comparisonDetail.values != null &&
        this.comparisonDetail.values[0] != null
      ) {
        const compareFilter = this.allFilters.find(
          (x) => x.id === this.comparisonDetail.filterId
        );
        for (let i = 0; i < this.comparisonDetail.values.length; i++) {
          const compareValue = this.comparisonDetail.values[i];
          let body = {
            ...this.getFilters,
            graphCategory: this.graphCategory,
          };
          body[compareFilter.apiRequestLabel] =
            compareFilter.englishLabel === "province"
              ? compareFilter.options.find((x) => x.id === compareValue)
                  .englishName
              : compareValue;
          res.push(body);
        }
      } else {
        res.push({
          ...this.getFilters,
          graphCategory: this.graphCategory,
        });
      }
      return res;
    },
  },
  created() {
    this.fetchChartData();
    this.updateCompareTitles();
  },
  beforeMount() {
    this.$nuxt.$on("update-sipa-charts", () => {
      this.graphSlices = [];
      this.fetchChartData();
      this.compareTitles = [];
      this.updateCompareTitles();
    });
  },
};
</script>