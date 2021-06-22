<template>
  <div class="my-4 shadow-md">
    <div class="bg-orange-100 rounded-t">
      <selectvue
        :value="selectedFilter == null ? null : selectedFilter.label"
        @input="setFilterTypeId"
        :options="filterTypeOptions"
        :reduce="(option) => option.id"
        label="label"
        placeholder="نوع فیلتر را انتخاب کنید"
        dir="rtl"
        class="style-chooser"
      ></selectvue>
    </div>
    <div v-if="filterTypeId != null">
      <div class="bg-white rounded-b">
        <selectvue
          :value="selectedFilter.value"
          @input="setFilter"
          :options="selectedFilter.options"
          label="name"
          :reduce="(option) => option.id"
          placeholder="انتخاب کنید"
          dir="rtl"
          class="style-chooser"
        ></selectvue>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  props: {
    filterTypeId: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters({
      removedFilterIds: "filters/getRemovedFilterIds",
      allFilters: "filters/getFilterDetails",
    }),
    filterTypeOptions() {
      let removedFilters = this.removedFilterIds;
      return this.allFilters.filter(
        (x) => !removedFilters.some((y) => x.id === y)
      );
    },
    selectedFilter() {
      let vm = this;
      return this.allFilters.find((x) => x.id === vm.filterTypeId);
    },
  },
  components: {
    selectvue: vSelect,
  },
  methods: {
    ...mapMutations({
      addRemovedFilterIds: "filters/addRemovedFilterIds",
      deleteRemovedFilterIds: "filters/deleteRemovedFilterIds",
      setFilterValue: "filters/setFilterValue",
    }),
    setFilterTypeId(val) {
      if (this.filterTypeId !== null)
        this.deleteRemovedFilterIds(this.filterTypeId);
      if (val === null) {
        this.deleteRemovedFilterIds(this.filterTypeId);
        this.setFilterValue({ id: this.filterTypeId, value: null });
        this.filterTypeId = val;
      } else {
        this.filterTypeId = val;
        this.addRemovedFilterIds(val);
      }
    },
    setFilter(val) {
      this.setFilterValue({ id: filterTypeId, value: val });
      this.$nuxt.$emit("update-sipa-charts");
    },
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