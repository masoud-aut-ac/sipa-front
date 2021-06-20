<template>
  <div class="bg-white rounded-lg p-6 shadow-md">
    <div class="flex items-stretch m-2">
      <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
      <p class="mr-2">{{ title }}</p>
    </div>
    <app-chart-column :graphData="graphSlices" v-if="chartMode === 'Column'" />
    <app-chart-pie :graphData="graphSlices" v-else />
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
    };
  },
  components: {
    AppChartColumn,
    AppChartPie,
  },
  methods: {
    fetchChartData() {
      let vm = this;
      let body = {
        ...this.getFilters,
        graphCategory: this.graphCategory,
      };
      this.$axios({
        method: "post",
        url: "GraphData",
        data: body,
      }).then((res) => {
        let slices = res.data.detail.graphSlices;
        slices = slices.map((x) => {
          return { name: x.name, y: x.percent };
        });
        vm.graphSlices.push({ slices });
      });
    },
  },
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
    }),
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