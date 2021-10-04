<template>
  <v-card class="mr-20 m-4 p-4 font-serif">
    <div class="flex cursor-pointer text-sm" @click="$router.push('/files')">
      <p>بازگشت به جدول اصلی</p>
      <v-icon>mdi-chevron-left</v-icon>
    </div>
    <AppTableMain
      :title="emptyRecordsTitle"
      :headers="emptyRecordsHeaders"
      :items="emptyRecordsItems"
      :hasPagination="false"
      :hasSearch="false"
    />
    <AppTableEdit />
    <v-btn color="#FFA000">اعمال تغییرات</v-btn>
  </v-card>
</template>

<script>
import AppTableMain from "~/components/App/AppTable/AppTableMain.vue";
import AppTableEdit from "~/components/App/AppTable/AppTableEdit.vue";

export default {
  data() {
    return {
      emptyRecordsTitle: "تعداد رکوردهای خالی",
      emptyRecordsHeaders: [
        {
          text: "طول جغرافیایی",
          align: "center",
          sortable: false,
          value: "lat",
          class: "bg-blue",
        },
        {
          text: "عرض جغرافیایی",
          sortable: false,
          align: "center",
          value: "lon",
          class: "bg-blue",
        },
        {
          text: "تاریخ",
          align: "center",
          value: "date",
          class: "bg-blue",
        },
        {
          text: "ساعت",
          align: "center",
          value: "time",
          class: "bg-blue",
        },
        {
          text: "تعداد مجروح",
          sortable: false,
          align: "center",
          value: "deaths",
          class: "bg-blue",
        },
        {
          text: "تعداد کشته",
          sortable: false,
          align: "center",
          value: "injuries",
          class: "bg-blue",
        },
        {
          text: "استان",
          sortable: false,
          align: "center",
          value: "province",
          class: "bg-blue",
        },
        {
          text: "نوع برخورد",
          sortable: false,
          align: "center",
          value: "incidentType",
          class: "bg-blue",
        },
        {
          text: "شکل برخورد",
          sortable: false,
          align: "center",
          value: "incidentForm",
          class: "bg-blue",
        },
      ],
      emptyRecordsItems: [
        {
          lat: 344,
          lon: 342,
          date: 20,
          time: 19,
          deaths: 534,
          injuries: 567,
          province: 56,
          incidentType: 987,
          incidentForm: 789,
        },
      ],
      inconsistentRecordsTitle: "رکوردهای غیرمنطبق",
      
    };
  },
  components: {
    AppTableMain,
    AppTableEdit
  },
};
</script>