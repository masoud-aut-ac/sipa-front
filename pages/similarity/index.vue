<template>
  <div class="mr-20 text-sm max-h-screen" style="direction: rtl">
    <div class="mt-4 mb-7 ml-4">
      <AppFilterDate :isGeneralPage="true" class="pt-2" />
      <div
        v-for="item in items"
        :key="item.id"
        class="
          mt-4
          bg-white
          shadow-md
          rounded
          p-4
          lg:p-8
          grid grid-cols-12
          gap-2
        "
        :class="item.class"
        style="border-right-width: 12px"
      >
        <p class="col-span-12 lg:col-span-6 2xl:col-span-8 text-lg font-bold">
          {{ item.title }}
        </p>
        <div
          class="col-span-12 sm:col-span-6 lg:col-span-3 2xl:col-span-2 flex"
        >
          <v-btn
            block
            :color="item.color"
            @click="$router.push('/similarity/details')"
            >{{ "تصادفات غیرخسارتی: " + item.nonDamaging }}</v-btn
          >
        </div>
        <div
          class="col-span-12 sm:col-span-6 lg:col-span-3 2xl:col-span-2 flex"
        >
          <v-btn
            block
            :color="item.color"
            @click="$router.push('/similarity/details')"
            >{{ "تصادفات فوتی: " + item.fatal }}</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFilterDate from "~/components/App/AppFilterDate.vue";

export default {
  middleware: "auth",
  computed: {
    items() {
      let res = [
        {
          id: 0,
          title: "تناظر کامل",
          nonDamaging: 11,
          fatal: 4,
          class: "border-green-900",
          color: "#00b050",
        },
        {
          id: 1,
          title: "تناظر ناقص",
          nonDamaging: 18,
          fatal: 3,
          class: "border-green-400",
          color: "#92d050",
        },
        {
          id: 2,
          title: "دارای متشابه غیرمتناظر",
          nonDamaging: 0,
          fatal: 0,
          class: "border-yellow",
          color: "#ffff00",
        },
        {
          id: 3,
          title: "بدون متشابه غیرمتناظر",
          nonDamaging: 0,
          fatal: 0,
          class: "border-orange",
          color: "#ffc000",
        },
        {
          id: 4,
          title: "تصادفات بدون متشابه ثبت شده در سازمان راهداری",
          nonDamaging: 6,
          fatal: 2,
          class: "border-red",
          color: "#FF0000",
        },
        {
          id: 5,
          title: "تصادفات بدون متشابه ثبت شده در اطلاعات پلیس",
          nonDamaging: 13,
          fatal: 0,
          class: "border-red-900",
          color: "#c00000",
        },
      ];
      return res;
    },
  },
  components: {
    AppFilterDate,
  },
};
</script>

<style>
.v-btn {
  font-weight: normal !important;
}
</style>