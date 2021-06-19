<template>
  <div class="bg-gray-100 shadow-md min-h-full p-4">
    <AppFilter />
    <AppComparison />
  </div>
</template>

<script>
import AppFilter from "~/components/App/AppFilter.vue";
import AppComparison from "~/components/App/AppComparison.vue";

export default {
  components: {
    AppFilter,
    AppComparison
  },
};
</script>

<style>
.v-btn {
  font-weight: normal !important;
}
</style>