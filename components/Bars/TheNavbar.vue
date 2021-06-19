<template>
  <v-app-bar
    fixed
    dark
    dense
    color="#2831A6"
    dir="rtl"
    class="font-serif"
    style="z-index: 501"
  >
      <img
      src="~/static/logo.png"
      height="32"
      width="32"
    />
    <v-toolbar-title class="mr-2" style="font-size: 0.875rem">
     سیپا</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <a v-if="isLoggedIn" class="px-5 cursor-pointer" style="font-size: 0.75rem" @click="logout"
      >خروج <v-icon small>mdi-location-exit</v-icon></a
    >
    <a class="md:px-5" style="font-size: 0.75rem">
      <v-icon small>mdi-home</v-icon>
    </a>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>t