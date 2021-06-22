<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-2">
    <app-chart
      :graphCategory="0"
      :title="'منبع دریافت پیام'"
      v-show="showGraph('infoSource')"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="1"
      :title="'وسیله دریافت پیام'"
      v-show="showGraph('infoDevice')"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="2"
      :title="'تعداد مجروحان هر تصادف'"
      v-show="showGraph('injuredCount')"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="3"
      :title="'تعداد فوتی ها هر تصادف'"
      v-show="showGraph('deadCount')"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="4"
      :title="'تعداد وسایل در هر تصادف'"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="5"
      :title="'انواع وسایل در هر تصادف'"
      v-show="showGraph('vehicleType')"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="6"
      :chartMode="'Column'"
      :title="'انواع برخورد در هر تصادف'"
      v-show="showGraph('incidentType')"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="7"
      :title="'شکل برخورد'"
      v-show="showGraph('incidentPart')"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="8"
      :title="'علت تامه تصادف ها'"
      v-show="showGraph('incidentReason')"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="11"
      :title="'ساعت'"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="10"
      :title="'ماه'"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="9"
      :title="'فصل'"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
  </div>
</template>

<script>
import AppChart from "~/components/App/AppChart.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AppChart,
  },
  computed: {
    ...mapGetters({
      allFilters: "filters/getFilterDetails",
      comparisonDetail: "filters/getComparisonDetail",
    }),
  },
  methods: {
    showGraph(graphEnglishLabel) {
      let res =
        this.allFilters.find((x) => x.englishLabel === graphEnglishLabel)
          .value === null;
      if (this.comparisonDetail != null) {
        let t =
          this.allFilters.find((x) => x.id === this.comparisonDetail.filterId)
            .englishLabel !== graphEnglishLabel;
        res = res && t;
      }
      return res;
    },
  },
};
</script>

<style>
</style>