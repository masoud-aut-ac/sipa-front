<template>
  <div class="bg-gray-100 shadow-md min-h-full p-4" style="direction: rtl">
    <v-icon color="#332A7C" class="mb-2 cursor-pointer" @click="toggleSideSheet"
      >mdi-close</v-icon
    >
    <AppFilter :allowedFilterTypes="allowedFilterTypes" :isMapPage="isMapPage" />
    <AppComparison v-if="!isMapPage" />
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
    isMapPage: {
      type: Boolean,
      default: false
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
      this.$nuxt.$emit("update-sipa-charts");
    },
  },
};
</script>

<style>
.v-btn {
  font-weight: normal !important;
}
</style>