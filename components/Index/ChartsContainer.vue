<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-2"
    style="direction: rtl"
  >
    <app-chart
      :graphCategory="9"
      :title="'فصل'"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="10"
      :title="'ماه'"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-2 2xl:col-span-2"
    />
    <app-chart
      :graphCategory="11"
      :title="'ساعت'"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 2xl:col-span-2"
    />
    <!-- <app-chart
      :graphCategory="8"
      :title="'علت تامه تصادف'"
      v-show="showGraph('incidentReason')"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 2xl:col-span-2"
    /> -->
    <app-chart
      :graphCategory="7"
      :title="'شکل برخورد'"
      v-show="showGraph('incidentPart')"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="6"
      :chartMode="'Column'"
      :title="'نوع برخورد'"
      v-show="showGraph('incidentType')"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="5"
      :title="'انواع وسایل در هر تصادف'"
      v-show="showGraph('vehicleType')"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-4 xl:col-span-2"
    />
    <app-chart
      :graphCategory="4"
      :title="'تعداد وسایل در هر تصادف'"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="3"
      :title="'تعداد فوتی در هر تصادف'"
      v-show="showGraph('deadCount')"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="2"
      :title="'تعداد جرحی در هر تصادف'"
      v-show="showGraph('injuredCount')"
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
      :graphCategory="0"
      :title="'منبع دریافت پیام'"
      v-show="showGraph('infoSource')"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
  </div>
</template>

<script>
import AppChart from "~/components/App/AppChart.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      graphFilters: [],
      TheComparisonDetail: null,
    };
  },
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
    updateGraphs() {
      this.graphFilters = this.allFilters.map((x) => {
        return { ...x };
      });
    },
    updateComparisonDetail() {
      this.TheComparisonDetail = this.comparisonDetail;
    },
    showGraph(graphEnglishLabel) {
      let res =
        this.graphFilters.find((x) => x.englishLabel === graphEnglishLabel)
          .value === null;
      if (this.TheComparisonDetail != null) {
        let t =
          this.graphFilters.find(
            (x) => x.id === this.TheComparisonDetail.filterId
          ).englishLabel !== graphEnglishLabel;
        res = res && t;
      }
      return res;
    },
  },
  created() {
    this.updateComparisonDetail();
    this.updateGraphs();
  },
  beforeMount() {
    this.$nuxt.$on("update-sipa-charts", () => {
      this.updateComparisonDetail();
      this.updateGraphs();
    });
  },
};
</script>
