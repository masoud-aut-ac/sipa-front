e a new component called WebViewer.vue under /components.

<template>
  <div>
    <div id="webviewer" ref="viewer"></div>
  </div>
</template>

<script>
export default {
  name: "WebViewer",

  mounted: function () {
    import("@pdftron/webviewer").then(() => {
      WebViewer(
        {
          path: "../webviewer",
          initialDoc:
            "/help.pdf", // replace with your own PDF file
        },
        this.$refs.viewer
      ).then((instance) => {
        // call apis here
      });
    });
  },
};
</script>

<style>
#webviewer {
  height: 100vh;
  width: 95%;
}
</style>