<template>
  <div class="bg-white rounded-lg p-8 shadow-md">
    <div class="flex items-stretch m-2">
      <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
      <p class="mr-2">منبع دریافت پیام</p>
    </div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      graphData: [],
    };
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
        colors: ["#332A7C"],
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
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
            text: "منبع‌های دریافت پیام",
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
        tooltip: {
          style: {
            fontFamily: "IRANSans",
          },
        },
        series: [
          {
            data: [
              [1, 5],
              [2, 3],
              [3, 7],
              [4, 5],
              [5, 8],
              [6, 1],
              [7, 5],
              [8, 3],
              [9, 7],
              [10, 5],
              [11, 8],
              [12, 1],
            ],
          borderRadius: 4
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
