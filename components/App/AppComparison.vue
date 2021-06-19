<template>
  <div class="bg-gray-200 rounded-lg p-4 mb-4">
    <v-checkbox
      v-model="hasComparison"
      label="مقایسه اطلاعات"
      color="#332A7C"
      hide-details
      dense
    ></v-checkbox>
    <div class="my-4 shadow-md">
      <div class="bg-orange-100 rounded-t">
        <selectvue
          v-model="comparison"
          :options="comparisonOptions"
          :reduce="(label) => label.id"
          placeholder="مقایسه بر اساس..."
          dir="rtl"
          class="style-chooser"
          :disabled="!hasComparison"
        ></selectvue>
      </div>
      <div class="bg-white rounded-b" v-if="comparison !== null">
        <selectvue
          multiple
          v-model="province"
          :options="provinces"
          :reduce="(label) => label.id"
          placeholder="انتخاب کنید"
          dir="rtl"
          class="style-chooser"
          :disabled="!hasComparison"
          v-on:input="limiter"
        ></selectvue>
      </div>
    </div>
    <p class="text-red text-xs" v-if="IsLimited">
      امکان مقایسه برای حداکثر 4 مورد وجود دارد
    </p>
    <v-btn dark block color="#332A7C" class="mt-4">جستجو</v-btn>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  data() {
    return {
      hasComparison: false,
      comparison: null,
      comparisonOptions: [
        { id: 0, label: "استان" },
        { id: 1, label: "نوع تصادف" },
        { id: 2, label: "شکل برخورد" },
      ],
      province: null,
      provinces: [
        { id: 0, label: "تهران" },
        { id: 1, label: "مازندران" },
        { id: 2, label: "گیلان" },
        { id: 3, label: "خراسان رضوی" },
        { id: 4, label: "اصفهان" },
      ],
      IsLimited: false,
    };
  },
  components: {
    selectvue: vSelect,
  },
  methods: {
    limiter(e) {
      if (e.length > 4) {
        this.IsLimited = true;
        console.log(" you can only select two", e);
        e.pop();
      } else this.IsLimited = false;
    },
  },
};
</script>

<style>
.v-input--selection-controls {
  margin-top: 0 !important;
}
.v-label {
  font-size: 0.875rem !important;
}
</style>
