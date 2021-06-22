<template>
  <div>
    <div
      v-if="compareTitle != null"
      class="bg-gray-100 rounded p-1 text-center mt-4 mb-2"
    >
      {{ compareTitle }}
    </div>
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
    compareTitle: {
      type: String
    }
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
          formatter: function () {
            return (
              this.point.name + ": %" + +parseFloat(this.point.y).toFixed(0)
            );
          },
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
              connectorShape: "crookedLine",
              useHTML: "<p></p>",
              format: "{point.name} : %{point.percentage:.0f} ",
              style: {
                fontFamily: "IRANSans",
              },
            },
          },
        ],
      };
    },
  },
};
</script>
