<template>
  <div class="font-serif my-8" style="direction: rtl">
    <div class="flex m-2">
      <v-icon x-small color="#FFA000" class="ml-2">mdi-circle</v-icon>
      <p>رکوردهای غیرمنطبق</p>
    </div>
    <v-data-table
      :headers="inconsistentRecordsHeaders"
      :items="inconsistentRecordsItems"
      hide-default-footer
      class="shadow mt-4"
    >

      <template v-slot:item.condition="{ item }">
        <v-radio-group v-model="item.condition" column>
          <v-radio label="انطباق با مقادیر قبلی" color="#FFA000" value="old"></v-radio>
          <v-radio label="مقدار جدید" color="#FFA000" value="new"></v-radio>
        </v-radio-group>
      </template>

      <template v-slot:item.change="props">
        <v-edit-dialog
          :return-value.sync="props.item.change"
          light
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
          cancel-text="انصراف"
          save-text="ذخیره"
        >
          <div>{{ props.item.change }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">اعمال تغییرات</div>
            <v-text-field
              v-model="props.item.change"
              label="تایپ کنید"
              single-line
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {},
      inconsistentRecordsHeaders: [
        {
          text: "مقدار",
          align: "center",
          sortable: false,
          value: "content",
          class: "bg-blue",
        },
        {
          text: "ستون",
          sortable: false,
          align: "center",
          value: "field",
          class: "bg-blue",
        },
        {
          text: "وضعیت",
          sortable: false,
          align: "center",
          value: "condition",
          class: "bg-blue",
        },
        {
          text: "تغییر جدید",
          sortable: false,
          align: "center",
          value: "change",
          class: "bg-blue",
        },
      ],
      inconsistentRecordsItems: [
        {
          content: "خراسان رضو",
          field: "استان",
          condition: "new",
          change: "تایپ کنید",
        },
        {
          content: "برخورد انسان با حیوان",
          field: "نوع برخورد",
          condition: "old",
          change: "برخورد انسان با حیوان",
        },
      ],
    };
  },
};
</script>

<style>
.theme--light.v-small-dialog__menu-content,
.theme--light.v-small-dialog__actions {
  font-family: "IRANSans";
  font-size: 0.8rem;
  direction: rtl;
}
button {
  font-family: "IRANSans";
}
.v-radio .theme--light {
    font-size: 0.875rem;
    color: black;
}
</style>