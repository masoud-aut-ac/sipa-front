<template>
  <div>
    <!-- this div contains the map -->
    <div id="map-wrap" class="z-0 rounded-lg shadow-md m-4 mr-20" style="direction: rtl; height: 96vh;">
      <!-- this div contains map guide -->
      <div
        class="
          absolute
          bottom-0
          left-0
          min-w-full
          bg-white
          bg-opacity-50
          text-center
          py-2
          pr-6
        "
        style="z-index: 500; direction: rtl"
      >
        <div v-for="m in this.mapGuide" :key="m.id" class="inline-block">
          <div class="flex items-stretch mx-2">
            <div
              class="w-4 h-4 m-2"
              :style="{ 'background-color': m.color }"
            ></div>
            <p class="font-serif text-xs my-2">
              {{ m.caption }}
            </p>
          </div>
        </div>
      </div>
      <!-- end of map guide -->
    </div>
    <!-- end of map -->

    <!-- this div contains mode switch -->
    <div class="absolute bottom-14 left-8" style="z-index: 409">
      <button class="mx-1" title="Light" @click="setTheMode('light')">
        <img
          src="/light.png"
          class="border-solid rounded-md border-2 border-white shadow-md"
        />
      </button>
      <button class="mx-1" title="Dark" @click="setTheMode('dark')">
        <img
          src="/dark.png"
          class="border-solid rounded-md border-2 border-white shadow-md"
        />
      </button>
      <button class="mx-1" title="Satellite" @click="setTheMode('satellite')">
        <img
          src="/satellite.png"
          class="border-solid rounded-md border-2 border-white shadow-md"
        />
      </button>
    </div>
    <!-- end of mode switch -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import * as L from "leaflet";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  data() {
    return {
      map: {},
      tileLayer: {},
      ostan: {}
    };
  },
  props: {
    mapGuide: {
      type: Array,
      default: function () {
        return [
          { caption: "کم", color: "#00FF00" },
          { caption: "نسبتا کم", color: "#F7FF00" },
          { caption: "نسبتا زیاد", color: "#FF9900" },
          { caption: "زیاد", color: "#FF0000" },
        ];
      },
    },
    mapColor: {
      type: Array,
      default: function () {
        return ["#00FF00", "#F7FF00", "#FF9900", "#FF0000", "#6f737c"];
      },
    },
    pointClick: {},
  },
  computed: {
    ...mapGetters({
      getMode: "index/getMode",
      getMapCenter: "index/getMapCenter",
      getMapZoom: "index/getMapZoom",
      getMapMinLat: "index/getMapMinLat",
      getMapMinLng: "index/getMapMinLng",
      getMapMaxLat: "index/getMapMaxLat",
      getMapMaxLng: "index/getMapMaxLng",
    }),
    tileUrl() {
      return this.getMapAddress(this.getMode);
    },
  },
  methods: {
    ...mapMutations({
      setMode: "index/setMode",
      setMapCenter: "index/setMapCenter",
      setMapZoom: "index/setMapZoom",
      setMapMinLat: "index/setMapMinLat",
      setMapMinLng: "index/setMapMinLng",
      setMapMaxLat: "index/setMapMaxLat",
      setMapMaxLng: "index/setMapMaxLng",
    }),

    setTheMode(mode) {
      this.setMode(mode);
    },

    getMapAddress(mode) {
      let res = "";
      switch (mode) {
        case "dark":
          res =
            "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlub29oYXJpciIsImEiOiJja2xkbGE2ZmgwcnY2MnFtMWtoOWl5dnpkIn0.umSsa-Et5gB6J96rzM4oWw";
          break;
        case "light":
          res =
            "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlub29oYXJpciIsImEiOiJja2xkbGE2ZmgwcnY2MnFtMWtoOWl5dnpkIn0.umSsa-Et5gB6J96rzM4oWw";
          break;
        case "satellite":
          res =
            "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlub29oYXJpciIsImEiOiJja2xkbGE2ZmgwcnY2MnFtMWtoOWl5dnpkIn0.umSsa-Et5gB6J96rzM4oWw";
          break;
      }
      return res;
    },
    drawMap() {
      let vm = this;
      const L = require("leaflet");

      this.map = L.map("map-wrap", {
        drawControl: true,
      });

      this.tileLayer = L.tileLayer(this.getMapAddress(this.getMode));
      this.tileLayer.addTo(this.map);

      let myRenderer = L.canvas({ padding: 0.5 });

      const searchControl = new GeoSearchControl({
        style: "button",
        provider: new OpenStreetMapProvider(),
      });
      vm.map.addControl(searchControl);

      let screenShoter = new SimpleMapScreenshoter();
      screenShoter.addTo(vm.map);

      let center = vm.getMapCenter;
      const zoom = vm.getMapZoom;
      vm.map.setView(center, zoom);

      vm.map.on("zoomend", function () {
        vm.setMapZoom(vm.map.getZoom());
        vm.setMapCenter(vm.map.getCenter());
        vm.setMapMinLat(vm.map.getBounds()._southWest.lat);
        vm.setMapMinLng(vm.map.getBounds()._southWest.lng);
        vm.setMapMaxLat(vm.map.getBounds()._northEast.lat);
        vm.setMapMaxLng(vm.map.getBounds()._northEast.lng);
      });

      vm.map.on("moveend", function () {
        // console.log(vm.map.getBounds());
        // console.log(vm.map.getZoom());
        // console.log(vm.map.getCenter());
        vm.setMapCenter(vm.map.getCenter());
        vm.setMapMinLat(vm.map.getBounds()._southWest.lat);
        vm.setMapMinLng(vm.map.getBounds()._southWest.lng);
        vm.setMapMaxLat(vm.map.getBounds()._northEast.lat);
        vm.setMapMaxLng(vm.map.getBounds()._northEast.lng);
      });
    },
    drawOstan() {
      let vm = this;

      vm.ostan = L.geoJSON.ajax("~/data/ostan.geojson").addTo(vm.map);
    }
  },

  mounted() {
    this.drawMap();
    this.drawOstan();
  },

  watch: {
    getMode(value) {
      this.tileLayer.setUrl(this.getMapAddress(value));
    },
  },
};
</script>

<style>
.leaflet-measure-resultpopup {
  font-family: "IRANSans";
}

.leaflet-control-measure {
  font-family: "IRANSans";
}

.leaflet-control-geosearch form input {
  height: 30px !important;
  direction: ltr;
}
.leaflet-touch .leaflet-bar a:last-child {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.leaflet-control-attribution {
  visibility: hidden!important;
}
</style>


