<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
export default {
  props: {
    graphData: {
      type: Array,
      required: true,
    },
    compareTitles: {
      type: Array,
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
          type: "column",
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
          enabled: this.compareTitles[0] != null,
        },
        yAxis: {
          visible: true,
          endOnTick: false,
          title: {
            enabled: true,
            text: "سهم (درصد)",
            style: {
              fontSize: "0.6rem",
              direction: "rtl",
              fontFamily: "IRANSans",
            },
          },
          lineWidth: 2,
          labels: {
            enabled: true,
            style: {
              fontFamily: "IRANSans",
            },
          },
        },
        xAxis: {
          visible: true,
          title: {
            enabled: true,
            text: "",
            style: {
              fontSize: "0.6rem",
              direction: "rtl",
              fontFamily: "IRANSans",
            },
          },
          lineWidth: 2,
          labels: {
            enabled: true,
            style: {
              fontFamily: "IRANSans",
            },
          },
          categories: this.getCategories,
        },
        tooltip: {
          formatter: function () {
            return (
              this.point.name + ": %" + +parseFloat(this.point.y).toFixed(0)
            );
          },
          style: {
            fontFamily: "IRANSans",
          },
        },
        series: this.graphData.map((x, i) => {
          let res = {
            data: x.slices,
            borderRadius: 4,
            dataLabels: {
              enabled: true,
              useHTML: "<p></p>",
              format: "{point.y:,.0f}",
              style: {
                fontFamily: "IRANSans",
                fontWeight: "normal",
              },
            },
          };
          if (this.compareTitles[i] != null) res.name = this.compareTitles[i];
          return res;
        }),
      };
    },
    getCategories() {
      let res = [];
      this.graphData.forEach((x) => x.slices.forEach((y) => res.push(y[0])));
      return res;
    },
  },

  methods: {},
  created() {},
};
</script>
