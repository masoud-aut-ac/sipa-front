<template>
  <div class="bg-white rounded-lg p-6 shadow-md">
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
        series: [
          {
            dataLabels: {
              enabled: true,
              format:
                "<b>{point.name}</b>:<br />{point.percentage:.1f} %<br />total: {point.total}",
              style: {
                fontFamily: "IRANSans",
              },
            },
            data: [
              {
                y: 45,
                name: "savari",
              },
              {
                y: 35,
                name: "وانت",
              },
              {
                y: 20,
                name: "موتورسیکلت",
              },
            ],
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
