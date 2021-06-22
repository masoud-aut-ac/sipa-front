<template>
  <div class="font-serif">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      right
      permanent
      fixed
      height="96%"
      dark
      class="rounded-lg"
      color="#332A7C"
      style="
        font-size: 0.75rem;
        z-index: 10;
        top: 50%;
        transform: translate(-20%, -50%);
      "
    >
      <v-list-item style="direction: rtl">
        <img src="~/static/logo.png" height="32" width="32" />
      </v-list-item>

      <v-divider></v-divider>
      <v-list style="direction: rtl">
            <v-list-item to="/">
              <v-list-item-icon>
                <img src="/chart.svg" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>تحلیل اطلاعات</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        <v-list-item to="/maps">
          <v-list-item-icon>
            <img src="/map.svg" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>اطلاعات مکانی</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item class="text-center" @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-location-exit</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
  methods: {
    ...mapMutations({
      setSidebar: "index/setSidebar",
    }),
    async logout() {
      await this.$auth.logout();
    },
  },
  watch: {
    mini(value) {
      this.setSidebar(value);
    },
  },
};
</script>

<style>
.v-btn--icon.v-size--default {
  width: auto;
}

.v-list-item__title {
  font-size: 0.75rem !important;
  padding-right: 12px !important;
}

.v-list-item--active {
  background-color: #5147a1;
}
.secondary-items .v-list-item--active {
  background-color: #363637;
}
.vac-textarea {
  text-align: right;
}
.vac-format-message-wrapper {
  text-align: right;
}
</style>