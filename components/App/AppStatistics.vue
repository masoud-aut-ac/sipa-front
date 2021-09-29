<template>
  <div class="grid grid-cols-1 gap-2">
    <AppStatisticsCard :cardData="crash" />
    <AppStatisticsCard :cardData="death" />
    <AppStatisticsCard :cardData="injury" />
  </div>
</template>

<script>
import AppStatisticsCard from "~/components/App/AppStatistics/AppStatisticsCard.vue";

export default {
  data() {
    return {
      crash: { title: "تعداد تصادف‌", amount: "2300" },
      death: { title: "تعداد فوتی‌", amount: "700" },
      injury: { title: "تعداد مجروح‌", amount: "3400" },
    };
  },
  components: {
    AppStatisticsCard,
  },
};
</script>