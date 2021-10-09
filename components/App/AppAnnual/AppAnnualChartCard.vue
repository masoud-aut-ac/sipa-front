<template>
  <v-card class="mb-2 text-sm font-serif mb-2" style="direction: rtl">
    <div class="flex m-4">
      <v-icon x-small color="#FFA000" class="ml-2 mt-1">mdi-circle</v-icon>
      <p>{{ title }}</p>
    </div>
    <AppAnnualChart :graphData="graphData" />
  </v-card>
</template>

<script>
export default {
  props: {
    graphData: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
    },
  },
  computed: {
    chartOptions() {
      return {
        exporting: {
          chartOptions: {
            // specific options for the exported image
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: false,
                },
              },
            },
          },
          fallbackToExportServer: false,
        },
        chart: {
          type: "column",
          height: "175rem",
        },
        title: {
          text: "",
        },
        colors: ["#332A7C", "#736bb4", "#87DFF0", "#F25767", "#FFA000"],
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          categories: this.getCategories,
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: "",
            data: this.graphData,
          },
        ],
      };
    },
    getCategories() {
      let res = [];
      this.graphData.forEach((x) => res.push(x[0]));
      return res;
    },
  },
};
</script>