<template>
  <div data-app class="font-serif">
    <TheSidebar />
    <Nuxt />
  </div>
</template>

<script>
import TheSidebar from "~/components/Bars/TheSidebar.vue"

export default {
  components: {
    TheSidebar,
  }
}
</script>

<style>
body {
  background-color: #f8f7fc;
}
</style>