<template>
  <div class="bg-white rounded-lg p-6 shadow-md">
    <div class="flex items-stretch m-2">
      <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
      <p class="mr-2">{{ title }}</p>
    </div>
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
      requestID: null,
    };
  },
  components: {
    AppChartColumn,
    AppChartPie,
  },
  methods: {
    fetchChartData() {
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
        }).then((res) => {
          if (myRequestID === vm.requestID) {
            let slices = res.data.detail.graphSlices;
            slices = slices.map((x) => {
              // return { name: x.name, y: x.percent };
              return [x.name, x.percent < 1.0 ? 0 : x.percent];
            });
            vm.graphSlices.push({ slices });
          }
        });
      });
    },
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
      hasComparison: "filters/getHasComparison",
      comparisonDetail: "filters/getComparisonDetail",
      allFilters: "filters/getFilterDetails",
    }),
    compareTitles() {
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
        res = compareFilter.options
          .filter((x) => this.comparisonDetail.values.some((y) => y === x.id))
          .map((x) => x.name);
      }
      return res;
    },
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
  },
  beforeMount() {
    this.$nuxt.$on("update-sipa-charts", () => {
      this.graphSlices = [];
      this.fetchChartData();
    });
  },
};
</script>