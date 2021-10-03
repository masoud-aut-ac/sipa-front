<template>
  <div class="mr-20 font-serif text-sm max-h-screen">
    <div class="grid grid-cols-12 gap-4">
      <div v-if="this.getSideSheet" class="col-span-12 lg:col-span-3">
        <AppSearchInfo
          :allowedFilterTypes="allowedFilterTypes"
          :isAnnualPage="true"
        />
      </div>
      <div
        :class="
          this.getSideSheet
            ? 'col-span-12 lg:col-span-9 mt-4 mb-4'
            : 'col-span-12 mt-4 mb-7 ml-4'
        "
        style="direction: rtl"
      >
        <div class="grid grid-cols-12 gap-2">
          <AppFilterChips
            :allowedFilterTypes="allowedFilterTypes"
            class="col-span-12"
          />
          <div class="col-span-12 lg:col-span-10">
            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-12 lg:col-span-4">
                <AppAnnualChart :graphData="graphDay" :title="titleDay" />
                <AppAnnualChart :graphData="graphMonth" :title="titleMonth" />
              </div>
              <AppAnnualTabs class="col-span-12 lg:col-span-8" />
            </div>
            <div class="col-span-12 lg:col-span-10">
              <AppAnnualChart :graphData="graphHour" :title="titleHour" />
            </div>
          </div>
          <div class="col-span-12 lg:col-span-2 flex">
            <AppAnnualStatistics class="flex-grow mb-2" />
            <!-- <AppAnnualMapGuide /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppFilterChips from "~/components/App/AppFilterChips.vue";
import AppSearchInfo from "~/components/App/AppSearchInfo.vue";
import AppAnnualStatistics from "~/components/App/AppAnnual/AppAnnualStatistics.vue";
import AppAnnualChart from "~/components/App/AppAnnual/AppAnnualChart.vue";
import AppAnnualTabs from "~/components/App/AppAnnual/AppAnnualTabs.vue";
import AppAnnualMapGuide from "~/components/App/AppAnnual/AppAnnualMap/AppAnnualMapGuide.vue";

export default {
  middleware: "auth",
  data() {
    return {
      graphDay: [
        {
          slices: [
            ["شنبه", 160],
            ["یکشنبه", 87],
            ["دوشنبه", 43],
            ["سه‌شنبه", 32],
            ["چهارشنبه", 78],
            ["پنجشنبه", 90],
            ["جمعه", 120],
          ],
        },
      ],
      titleDay: "روز تصادف‌ها",
      graphMonth: [
        {
          slices: [
            ["فروردین", 300],
            ["خرداد", 200],
            ["مرداد", 120],
            ["مهر", 87],
            ["آذر", 120],
            ["بهمن", 130],
          ],
        },
      ],
      titleMonth: "ماه تصادف‌ها",
      graphHour: [
        {
          slices: [
            ["00:00 تا 01:00", 300],
            ["02:00 تا 03:00", 200],
            ["04:00 تا 05:00", 120],
            ["06:00 تا 07:00", 87],
            ["09:00 تا 10:00", 120],
            ["11:00 تا 12:00", 130],
            ["13:00 تا 14:00", 130],
            ["15:00 تا 16:00", 130],
            ["17:00 تا 18:00", 130],
            ["19:00 تا 20:00", 130],
            ["21:00 تا 22:00", 130],
            ["23:00 تا 00:00", 130],
          ],
        },
      ],
      titleHour: "ساعت تصادف‌ها",
      allowedFilterTypes: [
        "province",
        "infoSource",
        "infoDevice",
        "injuredCount",
        "deadCount",
        "vehicleType",
        "incidentType",
        "incidentPart",
        "incidentReason",
      ],
    };
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
    }),
  },
  components: {
    AppFilterChips,
    AppSearchInfo,
    AppAnnualChart,
    AppAnnualStatistics,
    AppAnnualTabs,
    AppAnnualMapGuide,
  },
  methods: {
    ...mapMutations({
      setSideSheet: "index/setSideSheet",
    }),
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
</style>