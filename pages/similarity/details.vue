<template>
  <div class="mr-20 text-sm max-h-screen" style="direction: rtl">
    <div class="mt-4 mb-7 ml-4 bg-white rounded-lg p-4 lg:p-8 shadow-md">
      <div class="flex items-stretch m-2">
        <span> <v-icon x-small color="#FFA000">mdi-circle</v-icon></span>
        <p class="mr-2">داده‌های فوتی بهمن ماه استان فارس</p>
        <v-spacer></v-spacer>
        <div class="cursor-pointer" @click="$router.push('/similarity')">
          <div class="flex">
            <p class="mt-0.5">بازگشت</p>
            <v-icon>mdi-chevron-left</v-icon>
          </div>
        </div>
      </div>
      <v-data-table
        :headers="headers"
        :items="items"
        class="shadow my-4"
        hide-default-footer
        @click:row="rowClick"
      >
      </v-data-table>
      <v-dialog light v-model="dialog" width="770px">
        <div class="bg-white rounded p-4">
          <div class="text-right">
            <v-btn icon @click="dialog = false"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
          <v-data-table
            :headers="headersSimilars"
            :items="similars"
            class="shadow m-4"
            hide-default-footer
            @click:row="rowClick"
          >
          </v-data-table>
        </div>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import AppFilterDate from "~/components/App/AppFilterDate.vue";

export default {
  middleware: "auth",
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "روز تصادف",
          align: "center",
          sortable: false,
          value: "date",
          class: "bg-green-900",
        },
        {
          text: "ساعت تصادف",
          sortable: false,
          align: "center",
          value: "time",
          class: "bg-green-900",
        },
        {
          text: "محل تصادف",
          sortable: false,
          align: "center",
          value: "location",
          class: "bg-green-900",
        },
        {
          text: "تعداد فوتی",
          sortable: false,
          align: "center",
          value: "deadCount",
          class: "bg-green-900",
        },
        {
          text: "تعداد مجروح",
          sortable: false,
          align: "center",
          value: "injuredCount",
          class: "bg-green-900",
        },
        {
          text: "نوع برخورد",
          sortable: false,
          align: "center",
          value: "incidentType",
          class: "bg-green-900",
        },
      ],
      items: [
        {
          id: 0,
          date: "01",
          time: "16:55",
          location: "کازرون به دشت ارژن",
          deadCount: 2,
          injuredCount: 12,
          incidentType: "برخورد وسیله با موتور",
        },
        {
          id: 1,
          date: "01",
          time: "16:55",
          location: "کازرون به دشت ارژن",
          deadCount: 2,
          injuredCount: 12,
          incidentType: "برخورد وسیله با موتور",
        },
        {
          id: 2,
          date: "01",
          time: "16:55",
          location: "کازرون به دشت ارژن",
          deadCount: 2,
          injuredCount: 12,
          incidentType: "برخورد وسیله با موتور",
        },
      ],
      headersSimilars: [
        {
          text: "مرکز پلیس",
          align: "center",
          sortable: false,
          value: "police",
          class: "bg-green-900",
        },
        {
          text: "محل تصادف",
          align: "center",
          sortable: false,
          value: "location",
          class: "bg-green-900",
        },
        {
          text: "نوع برخورد",
          align: "center",
          sortable: false,
          value: "incidentType",
          class: "bg-green-900",
        },
        {
          text: "فاصله (کیلومتر)",
          align: "center",
          sortable: false,
          value: "distance",
          class: "bg-green-900",
        },
      ],
      similars: [
        {
          id: 0,
          police: "پلیس‌راه شیراز - پاسارگاد",
          location: "کمربندی فتح‌آباد",
          incidentType: "واژگونی و سقوط",
          distance: 27,
        },
      ],
    };
  },
  components: {
    AppFilterDate,
  },
  methods: {
    rowClick(item) {
      console.log(item);
      this.dialog = true;
    },
  },
};
</script>

<style>
.v-btn {
  font-weight: normal !important;
}
tr:hover {
  cursor: pointer !important;
}
.v-btn:focus {
  outline: none !important;
}
</style>