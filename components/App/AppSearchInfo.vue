<template>
  <div
    class="bg-gray-100 shadow-md h-full min-h-screen p-4"
    style="direction: rtl"
  >
    <v-icon color="#332A7C" class="mb-2 cursor-pointer" @click="toggleSideSheet"
      >mdi-close</v-icon
    >
    <AppFilter :allowedFilterTypes="allowedFilterTypes" />
    <AppComparison
      v-if="showComparison"
      :allowedFilterTypes="allowedFilterTypes"
    />
    <div class="mt-4" style="direction: ltr">
      <v-btn dark block color="#332A7C" @click="emitter()">اعمال فیلتر</v-btn>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import AppFilter from "~/components/App/AppFilter.vue";
import AppComparison from "~/components/App/AppComparison.vue";

export default {
  props: {
    allowedFilterTypes: {
      type: Array,
    },
    onUpdateFilters: {
      type: Function,
      default: () => {},
    },
    showComparison: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppFilter,
    AppComparison,
  },
  methods: {
    ...mapMutations({
      setSideSheet: "index/setSideSheet",
    }),
    toggleSideSheet() {
      this.setSideSheet(false);
    },
    emitter() {
      this.onUpdateFilters();
    },
  },
};
</script>

<style>
.v-btn {
  font-weight: normal !important;
}
</style>