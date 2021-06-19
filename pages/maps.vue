<template>
  <div class="font-serif">
    <div class="absolute top-8 right-24 z-50 bg-orange-100 w-72 shadow-md rounded-lg">
      <selectvue
        v-model="mapType"
        :options="mapTypeOptions"
        :reduce="(label) => label.id"
        placeholder="انتخاب کنید"
        dir="rtl"
        class="style-chooser text-sm px-1"
        :clearable="false"
      ></selectvue>
    </div>
    <AppMap />
  </div>
</template>

<script>
import AppMap from "~/components/App/AppMap.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  data() {
    return {
      mapType: 1,
      mapTypeOptions: [
        {id:0, label: "سهم داده‌های سامانه از داده‌های پلیس"},
        {id:1, label: "نقشه تعداد تصادف‌ها"},
        {id:2, label: "نقشه تعداد مجروح‌ها"},
        {id:3, label: "نقشه تعداد فوتی‌ها"},
      ]
    }
  },
  components: {
    AppMap,
    selectvue: vSelect,
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
.style-chooser .vs__search::placeholder {
  color: black;
}
.style-chooser .vs__search {
  color: black;
}
.style-chooser .vs__dropdown-toggle {
  padding: 5px 0 5px 0;
  border: none;
}
</style>

