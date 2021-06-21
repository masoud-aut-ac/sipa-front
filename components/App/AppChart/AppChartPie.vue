<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
export default {
  props: {
    graphData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
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
          animation: false,
          type: "pie",
          zoomType: "x",
          height: "250rem",
        },
        title: {
          text: "",
        },
        colors: ["#332A7C", "#FFA000", "#5147A1", "#87DFF0", "#F25767"],
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          style: {
            fontFamily: "IRANSans",
          },
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        series: [
          {
            data: this.graphData.slices,
            dataLabels: {
              connectorShape: 'crookedLine',
              useHTML: "<p></p>",
              format: "<b>{point.name}</b> : % {point.percentage:.1f} ",
              style: {
                fontFamily: "IRANSans",
              },
            },
          },
        ],
      };
    },
  },

  methods: {
    // getChartColumnValues() {
    //   let vm = this;
    //   return this.$axios({
    //     method: "get",
    //     url: "chart",
    //   }).then((response) => {
    //     this.graphData = response.data.detail;
    //   });
    // },
  },
  created() {
    // this.getChartColumnValues();
  },
};
</script>
