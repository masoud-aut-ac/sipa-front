<template>
  <div data-app>
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