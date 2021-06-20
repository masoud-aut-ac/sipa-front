<template>
  <div class="mr-20 font-serif text-sm" style="direction: rtl">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-9 mt-4 mb-7">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <AppFilterDate class="col-span-1" />
          <AppFilterChips class="col-span-1 lg:col-span-3" />
        </div>
        <div class="pt-2">
          <charts-container></charts-container>
        </div>
      </div>
      <AppSearchInfo class="col-span-12 lg:col-span-3"  />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppFilterChips from "~/components/App/AppFilterChips.vue";
import AppFilterDate from "~/components/App/AppFilterDate.vue";
import AppSearchInfo from "~/components/App/AppSearchInfo.vue";
import ChartsContainer from "~/components/Index/ChartsContainer.vue";

export default {
  middleware: "auth",

  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
    }),
  },
  components: {
    AppFilterChips,
    AppFilterDate,
    AppSearchInfo,
    ChartsContainer,
  },
};
</script>

<style>
body {
  background-color: #f8f7fc;
}
</style>