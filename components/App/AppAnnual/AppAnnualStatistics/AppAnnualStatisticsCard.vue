<template>
  <v-card class="py-4 px-2 text-sm font-serif" style="direction: rtl">
    <div class="mr-2">
      <div>
        <p class="text-lg font-bold mb-2">{{ cardaTitle }}</p>
        <p class="text-3xl font-bold">{{ cardData | commas }}</p>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    cardaTitle: {
      type: String
    },
    cardData: {
      type: Number,
    },
  },
};
</script>