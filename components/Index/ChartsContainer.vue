<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-2">
    <app-chart
      :graphCategory="0"
      :title="'منبع دریافت پیام'"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="1"
      :title="'وسیله دریافت پیام'"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="2"
      :title="'تعداد مجروحان هر تصادف'"
      :chartMode="'Pie'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="3"
      :title="'تعداد فوتی ها هر تصادف'"
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
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="6"
      :chartMode="'Column'"
      :title="'انواع برخورد در هر تصادف'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="7"
      :title="'شکل برخورد'"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="8"
      :title="'علت تامه تصادف ها'"
      :chartMode="'Column'"
      class="col-span-1 lg:col-span-2"
    />
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
      class="col-span-1 lg:col-span-2"
    />
    <app-chart
      :graphCategory="11"
      :title="'ساعت'"
      :chartMode="'Column'"
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
      getFilters: "filters/getFilters",
    }),
  },
};
</script>

<style>
</style>