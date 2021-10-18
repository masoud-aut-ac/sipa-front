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
    isInTabs: {
      type: Boolean,
      default: false,
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
          type: "column",
          // zoomType: "x",
          height: this.isInTabs ? "360rem" : "175rem",
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
          labels: {
            enabled: true,
            style: {
              fontFamily: "IRANSans",
            },
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            enabled: true,
            style: {
              fontFamily: "IRANSans",
            },
          },
        },
        tooltip: {
          formatter: function () {
            return (
              this.point.category + ": " + parseFloat(this.point.y).toFixed(0)
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
        },
        series: [
          {
            name: "",
            data: this.graphData,
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
      this.graphData.forEach((x) => res.push(x.persianName));
      return res;
    },
  },
};
</script>