<template>
  <div class="grid grid-cols-1 gap-2">
    <AppAnnualStatisticsCard :cardData="generalData.incidentCount" :cardaTitle="incidentTitle" />
    <AppAnnualStatisticsCard :cardData="generalData.deadCount" :cardaTitle="deadTitle" />
    <!-- <AppAnnualStatisticsCard :cardData="generalData.injuredCount" :cardaTitle="injuredTitle" /> -->
    <AppAnnualMapGuide />
  </div>
</template>

<script>
import AppAnnualStatisticsCard from "~/components/App/AppAnnual/AppAnnualStatistics/AppAnnualStatisticsCard.vue";

export default {
  props: {
    generalData: {
      type: Object
    }
  },
  data() {
    return {
      // incidentTitle: "تعداد تصادف",
      // deadTitle: "تعداد فوتی",
      incidentTitle: "تعداد تصادف فوتی",
      deadTitle: "تعداد فوتی سر صحنه",
      // injuredTitle: "تعداد مجروح",
    };
  },
  components: {
    AppAnnualStatisticsCard,
  },
};
</script>