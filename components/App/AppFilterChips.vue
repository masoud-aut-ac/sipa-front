<template>
  <div class="bg-white rounded-lg p-4 shadow-md">
    <div class="flex items-stretch m-2">
      <span><v-icon color="#FFA000" class="mt-1">mdi-filter</v-icon></span>
      <p class="leading-8 mr-1 cursor-pointer" @click="setSideSheet(true)">
        فیلترها
      </p>
      <div class="mx-4">
        <v-chip v-if="chip1" close @click:close="chip1 = false">
          استان تهران
        </v-chip>

        <v-chip v-if="chip2" close @click:close="chip2 = false"> سواری </v-chip>

        <v-chip v-if="chip3" close @click:close="chip3 = false">
          جلو به پهلو
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      chip1: true,
      chip2: true,
      chip3: true,
      chip4: true,
    };
  },
  computed: {
    ...mapGetters({
      getSideSheet: "index/getSideSheet",
    }),
  },
  methods: {
    ...mapMutations({
      setSideSheet: "index/setSideSheet",
    }),
  },
};
</script>
<style>
.v-chip__close {
  margin-right: 12px !important;
}
</style>