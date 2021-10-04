<template>
  <div class="font-serif my-8" style="direction: rtl">
    <div class="flex m-2">
      <v-icon x-small color="#FFA000" class="ml-2">mdi-circle</v-icon>
      <p>{{ title }}</p>
    </div>
    <v-text-field
      v-if="hasSearch"
      v-model="search"
      append-icon="mdi-magnify"
      label="جستجو"
      single-line
      hide-details
      reverse
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="search"
      hide-default-footer
      class="shadow mt-4"
      @page-count="pageCount = $event"
      @click:row="rowClick"
    ></v-data-table>
    <div v-if="hasPagination" class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="5"
        color="#e0daee"
        prev-icon="mdi-chevron-right"
        next-icon="mdi-chevron-left"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    headers: {
      type: Array,
    },
    items: {
      type: Array,
    },
    hasPagination: {
      type: Boolean,
      default: true,
    },
    hasSearch: {
      type: Boolean,
      default: true,
    },
    rowClick: {
      type: Function,
      default: function () {
        console.log(":)");

      }
    }
  },
  data() {
    return {
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
    };
  },
};
</script>

<style>
th {
  color: white !important;
}
/* tr:hover {
  cursor: pointer;
} */
.v-data-table-header-mobile {
  display: none !important;
}
.theme--light.v-pagination .v-pagination__item--active {
  color: black;
}
.v-pagination__item:focus {
  outline: none;
}
.v-pagination__item--active:focus {
  outline: none;
}
</style>