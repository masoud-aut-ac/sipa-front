<template>
  <div class="bg-gray-200 rounded-lg p-4 mb-4">
    <p>فیلتر اطلاعات</p>
    <AppFilterSingle v-for="item in items" :key="item.id" />
    <v-btn class="my-2" fab dark x-small color="#FFA000" @click="addFilter()">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
    <v-btn dark block color="#332A7C" class="mt-4">جستجو</v-btn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import AppFilterSingle from "~/components/App/AppFilterSingle.vue";

export default {
  data() {
    return {
      items: [{ id: 0 }],
    };
  },
  components: {
    AppFilterSingle,
  },
  methods: {
    ...mapMutations({
      setRemovedFilterIds: "filters/setRemovedFilterIds"
    }),
    addFilter() {
      this.items.push({id: 1});
    },
  },
  mounted() {
    this.setRemovedFilterIds([]);
  }
};
</script>

<style>
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter {
  transform: translateY(-100%);
  opacity: 0;
}
.v-btn:focus {
  outline: none !important;
}
.v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
  min-height: 28px!important;
  font-size: 14px!important;
}
</style>