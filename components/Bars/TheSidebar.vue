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
        <img src="~/static/logo.png" height="40" width="40" />
      </v-list-item>

      <v-divider></v-divider>
      <v-list style="direction: rtl">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item to="/" v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <img src="/report.png" />
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>گزارش کلی</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item to="/charts" v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <img src="/chart.svg" />
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>نمودارها</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item to="/maps" v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <img src="/map.svg" />
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>نقشه‌ها</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item to="/data-entry-history" v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <img src="/folder.svg" />
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>تاریخچه ورود اطلاعات</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item to="/data-cleaning" v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <img src="/dataCleaning2.png" />
              </v-list-item-icon>
            </v-list-item>
          </template>
          <span>پاکسازی داده</span>
        </v-tooltip>
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
.v-tooltip__content {
  font-family: IRANSans!important;
  font-size: 0.725rem !important;
  z-index: 500!important;
}
</style>