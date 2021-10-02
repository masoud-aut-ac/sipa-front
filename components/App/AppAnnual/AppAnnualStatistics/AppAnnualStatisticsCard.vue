<template>
  <v-card class="py-4 px-2 text-sm font-serif" style="direction: rtl">
    <div class="mr-2">
      <div>
        <p class="text-lg font-bold mb-2">{{ cardData.title }}</p>
        <p class="text-3xl font-bold">{{ cardData.amount | commas }}</p>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
    },
  },
};
</script>