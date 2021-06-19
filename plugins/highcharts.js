import Vue from 'vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import hcMore from "highcharts/highcharts-more";
import exportingInit from 'highcharts/modules/exporting';
import exportingOffline from 'highcharts/modules/offline-exporting';

exportingInit(Highcharts)
exportingOffline(Highcharts)

hcMore(Highcharts);

Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Sahel',
        },
    },
    exporting: {
        enabled: true
    }
});

Vue.use(HighchartsVue, {
    highcharts: Highcharts
})