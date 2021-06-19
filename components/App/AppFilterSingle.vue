<template>
  <div class="my-4 shadow-md">
    <div class="bg-orange-100 rounded-t">
      <selectvue
        v-model="filterType"
        :options="filterTypeOptions"
        :reduce="(label) => label.id"
        placeholder="نوع فیلتر را انتخاب کنید"
        dir="rtl"
        class="style-chooser"
      ></selectvue>
    </div>
    <div class="bg-white rounded-b" v-if="filterType === 0">
      <selectvue
        v-model="filterLocation"
        :options="filterLocationOptions"
        :reduce="(label) => label.id"
        placeholder="انتخاب کنید"
        dir="rtl"
        class="style-chooser"
      ></selectvue>
    </div>
    <div class="bg-white rounded-b" v-if="filterType === 1">
      <selectvue
        v-model="filterIncidentType"
        :options="filterIncidentTypeOptions"
        :reduce="(label) => label.id"
        placeholder="انتخاب کنید"
        dir="rtl"
        class="style-chooser"
      ></selectvue>
    </div>
    <div class="bg-white rounded-b" v-if="filterType === 2">
      <selectvue
        v-model="filterIncidentPart"
        :options="filterIncidentPartOptions"
        :reduce="(label) => label.id"
        placeholder="انتخاب کنید"
        dir="rtl"
        class="style-chooser"
      ></selectvue>
    </div>
    <div class="bg-white rounded-b" v-if="filterType === 3">
      <v-text-field
        type="number"
        v-model="InjuriesCount"
        placeholder="تعداد مجروحان را وارد کنید"
        solo
        dense
        flat
      ></v-text-field>
    </div>
    <div class="bg-white rounded-b h-8" v-if="filterType === 4">
      <input
        class="p-1 min-w-full"
        v-model="date"
        id="my-custom-input"
        placeholder="انتخاب کنید"
      />
      <datePicker
        v-model="date"
        popover
        range
        color="#FFA000"
        element="my-custom-input"
      ></datePicker>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
  data() {
    return {
      filterType: null,
      filterTypeOptions: [
        { id: 0, label: "مکان" },
        { id: 1, label: "نوع برخورد" },
        { id: 2, label: "شکل برخورد" },
        { id: 3, label: "تعداد مجرحان" },
        { id: 4, label: "زمان" },
      ],
      filterLocation: null,
      filterLocationOptions: [
        { id: 0, label: "استان تهران" },
        { id: 1, label: "استان مازندران" },
        { id: 2, label: "استان گیلان" },
      ],
      filterIncidentType: null,
      filterIncidentTypeOptions: [
        { id: 0, label: "عابر پیاده و سواری" },
        { id: 1, label: "دوچرخه و سواری" },
        { id: 2, label: "واژگونی" },
      ],
      filterIncidentPart: null,
      filterIncidentPartOptions: [
        { id: 0, label: "جلو به پهلو" },
        { id: 1, label: "پهلو به پهلو" },
      ],
      date: null,
    };
  },
  components: {
    selectvue: vSelect,
    datePicker: VuePersianDatetimePicker,
  },
};
</script>

<style>
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
.v-text-field__details {
  display: none !important;
}
</style>