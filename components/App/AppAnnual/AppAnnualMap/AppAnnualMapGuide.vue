<template>
  <v-card class="p-4 text-sm font-serif" style="direction: rtl">
    <p class="font-bold">راهنمای نقشه</p>
    <div v-for="item in items" :key="item.text" class="flex my-2">
      <v-icon x-small :color="item.color" class="ml-2 mt-1">mdi-circle</v-icon>
      <p>{{ item.text }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: "جرحی", color: "#FFA000" },
        { text: "فوتی", color: "#F25767" },
      ],
    };
  },
};
</script>