<template>
  <div class="grid grid-cols-1 gap-2">
    <AppAnnualStatisticsCard :cardData="crash" />
    <AppAnnualStatisticsCard :cardData="death" />
    <AppAnnualStatisticsCard :cardData="injury" />
  </div>
</template>

<script>
import AppAnnualStatisticsCard from "~/components/App/AppAnnual/AppAnnualStatistics/AppAnnualStatisticsCard.vue";

export default {
  data() {
    return {
      crash: { title: "تعداد تصادف‌", amount: "2300" },
      death: { title: "تعداد فوتی‌", amount: "700" },
      injury: { title: "تعداد مجروح‌", amount: "3400" },
    };
  },
  components: {
    AppAnnualStatisticsCard,
  },
};
</script>