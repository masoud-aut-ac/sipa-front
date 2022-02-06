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
  computed: {
    chartOptions() {
      return {
        exporting: {
          chartOptions: {
            // specific options for the exported image
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: true,
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
          height: "280rem",
        },
        title: {
          text: "",
        },
        colors: this.graphData.colors,
        credits: {
          enabled: false,
        },
        legend: {
          enabled: true,
          rtl: true,
          itemStyle: {
            fontSize: "0.6rem",
            fontFamily: "IRANSans",
          },
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
          labels: {
            enabled: true,
            style: {
              fontFamily: "IRANSans",
            },
          },
          lineWidth: 2,
          //   stackLabels: {
          //     enabled: true,
          //     style: {
          //       fontFamily: "IRANSans",
          //     },
          //   },
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
          categories: this.graphData.categories,
        },
        tooltip: {
          formatter: function () {
            return (
              this.point.series.name +
              ": " +
              +this.point.custom.value +
              " (" +
              parseFloat(this.point.y).toFixed(0) +
              "%)"
            );
          },
          style: {
            fontFamily: "IRANSans",
          },
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            keys: ["y", "custom.value"],
            dataLabels: {
              rotation: 270,
            },
          },
        },
        series: this.graphData.series.map((x, i) => {
          let res = {
            name: x.name,
            data: x.data,
            dataLabels: {
              enabled: true,
              useHTML: "<p></p>",
              //   format: "{point.y:,.0f}",
              formatter: function () {
                return this.point.y > 15
                  ? this.point.custom.value.toString()
                  : "";
              },
              style: {
                fontFamily: "IRANSans",
                fontWeight: "normal",
              },
            },
          };
          return res;
        }),
      };
    },
  },
};
</script>