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
            :headers="selectTableHeaders"
            :items="similars"
            class="shadow m-4"
            hide-default-footer
            dir="rtl"
          >
          </v-data-table>
        </div>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SimilarityTableHeaders from "~/mixins/SimilarityTableHeaders";
import AppFilterDate from "~/components/App/AppFilterDate.vue";

export default {
  middleware: "auth",
  mixins: [SimilarityTableHeaders],
  data() {
    return {
      dialog: false,
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
  computed: {
    ...mapGetters({
      getSimilarityID: "index/getSimilarityID",
    }),
    selectTableHeaders() {
      let res;
      switch (this.getSimilarityID) {
        case 1:
          res = this.headersSimilars0;
          break;
        case 2:
          res = this.headersSimilars1;
          break;
        case 3:
          res = this.headersSimilars2;
          break;
        case 4:
          res = this.headersSimilars3;
          break;
        default:
          res = this.headersSimilars4;
      }
      return res;
    },
  },
  components: {
    AppFilterDate,
  },
  methods: {
    rowClick(item) {
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