<template>
  <v-card class="mr-20 m-4 p-4">
    <AppTableMain :title="title" :headers="headers" :items="items" />
  </v-card>
</template>

<script>
import AppTableMain from "~/components/App/AppTable/AppTableMain.vue";

export default {
  data() {
    return {
      title: "جدول تاریخچه ورود اطلاعات",
      headers: [
        {
          text: "تاریخ و ساعت ورود اطلاعات",
          align: "center",
          sortable: false,
          value: "date",
          class: "bg-blue",
        },
        {
          text: "منبع اطلاعاتی",
          sortable: false,
          align: "center",
          value: "source",
          class: "bg-blue",
        },
        {
          text: "تعداد رکورد",
          align: "center",
          value: "count",
          class: "bg-blue",
        },
        {
          text: "تعداد رکورد تکراری",
          align: "center",
          value: "countRepeated",
          class: "bg-blue",
        },
        {
          text: "اولین تاریخ ثبت شده",
          sortable: false,
          align: "center",
          value: "DateFirst",
          class: "bg-blue",
        },
        {
          text: "آخرین تاریخ ثبت شده",
          sortable: false,
          align: "center",
          value: "DateLast",
          class: "bg-blue",
        },
      ],
      items: [
        {
          date: "1398-03-01 12:32",
          source: "پلیس راه",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "هلال احمر",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "اورژانس",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "راهداری",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "هلال احمر",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "اورژانس",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "راهداری",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "هلال احمر",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "اورژانس",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "راهداری",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "هلال احمر",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "اورژانس",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
        {
          date: "1398-03-01 12:32",
          source: "راهداری",
          count: 234,
          countRepeated: 43,
          DateFirst: "1398-01-01",
          DateLast: "1398-02-31",
        },
      ],
    };
  },
  components: {
    AppTableMain,
  },
};
</script>