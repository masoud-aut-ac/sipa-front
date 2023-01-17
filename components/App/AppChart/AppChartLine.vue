<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
export default {
  props: {
    graphData: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: "220px",
    },
    xAxisTitle: {
      type: String,
    },
    yAxisTitle: {
      type: String,
      default: "درصد",
    },
  },
  computed: {
    chartOptions() {
      return {
        exporting: {
          // specific options for the exported image
          chartOptions: {
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: true,
                },
              },
            },
          },
          navigator: {
            enabled: false,
          },
          scrollbar: {
            enabled: false,
          },
        },
        chart: {
          type: "line",
          // zoomType: "x",
          height: this.height,
          backgroundColor: "transparent",
        },
        title: {
          text: "",
        },
        colors: [
            "#FFA000",
          "#85dbc4",
          "#01B182",
          "#736bb4",
          "#87DFF0",
          "#F25767",
        ],
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          title: {
            text: this.xAxisTitle,
          },
          categories: this.getCategories,
          labels: {
            enabled: true,
            style: {
              fontFamily: "IRANSans",
            },
          },
          lineColor: "#252526",
          lineWidth: 1,
        },
        yAxis: {
          title: {
            text: this.yAxisTitle,
            style: {},
          },
          labels: {
            enabled: true,
            style: {
              fontFamily: "IRANSans",
            },
          },
          gridLineColor: "#252526",
          max: 100,
        },
        tooltip: {
          formatter: function () {
            return (
              this.point.category +
              ": " +
              parseFloat(this.point.y).toFixed(0) +
              "%"
            );
          },
          style: {
            fontFamily: "IRANSans",
          },
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
          series: {
            marker: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: "",
            data: this.graphData,
            opacity: 0.8,

            // dataLabels: {
            //   enabled: true,
            //   useHTML: "<p></p>",
            //   format: "{point.y:,.0f}",
            //   style: {
            //     fontFamily: "IRANSans",
            //     fontWeight: "normal",
            //   },
            // },
          },
        ],
      };
    },
    getCategories() {
      let res = [];
      this.graphData.forEach((x) => res.push(x.name));
      return res;
    },
  },
};
</script>

<style>
.highcharts-root {
  font-family: "IRANSans" !important;
}
</style>