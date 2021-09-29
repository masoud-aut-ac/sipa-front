<template>
  <div class="mr-20 font-serif text-sm">
    <div class="grid grid-cols-12 gap-4">
      <div v-if="this.getSideSheet" class="col-span-12 lg:col-span-3">
        <AppSearchInfo :allowedFilterTypes="allowedFilterTypes" :isAnnualPage="true"/>
      </div>
      <div
        :class="
          this.getSideSheet
            ? 'col-span-12 lg:col-span-9 mt-4 mb-7'
            : 'col-span-12 mt-4 mb-7 ml-4'
        "
      >
        <div class="grid grid-cols-12">
          <AppStatistics class="col-span-12 lg:col-span-2" />
          <div class="col-span-12 lg:col-span-7"></div>
          <div class="col-span-12 lg:col-span-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppSearchInfo from "~/components/App/AppSearchInfo.vue";
import AppStatistics from "~/components/App/AppStatistics.vue";

export default {
  middleware: "auth",
  data() {
    return {
      totalCrash: { title: "تعداد کل تصادف‌ها", amount: "8609" },
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
    AppSearchInfo,
    AppStatistics,
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