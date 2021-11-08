<template>
  <v-card class="p-4 text-sm font-serif" style="direction: rtl">
    <p class="font-bold">راهنمای نقشه</p>
    <div v-for="item in items" :key="item.text" class="flex my-2">
      <div class="h-2.5 w-2.5 border rounded-full mt-1.5 ml-2" :style="{'background-color': item.color}"></div>
      <p>{{ item.text }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        // { text: "تعداد تصادف جرحی", color: "#F7FF00" },
        { text: "تعداد تصادف فوتی", color: "#FF0000" },
      ],
    };
  },
};
</script>