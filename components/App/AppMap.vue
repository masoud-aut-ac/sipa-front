<template>
  <div>
    <!-- this div contains the map -->
    <div
      id="map-wrap"
      class="z-0 rounded-lg shadow-md"
      style="direction: rtl; height: 100vh"
    >
      <!-- this div contains map guide -->
      <div
        class="
          absolute
          bottom-0
          left-0
          min-w-full
          bg-white bg-opacity-50
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
            <p class="font-serif text-sm my-2">
              {{ m.caption }}
            </p>
          </div>
        </div>
      </div>
      <!-- end of map guide -->
    </div>
    <!-- end of map -->

    <!-- this div contains mode switch -->
    <div class="absolute bottom-14 left-8 z-40">
      <button class="mx-1" title="Satellite" @click="setTheMode('satellite')">
        <img
          src="/satellite.png"
          class="border-solid rounded-md border-2 border-gray-200 shadow-md"
        />
      </button>
      <!-- <button class="mx-1" title="Dark" @click="setTheMode('dark')">
        <img
          src="/dark.png"
          class="border-solid rounded-md border-2 border-gray-200 shadow-md"
        />
      </button> -->
      <button class="mx-1" title="Light" @click="setTheMode('light')">
        <img
          src="/light.png"
          class="border-solid rounded-md border-2 border-gray-200 shadow-md"
        />
      </button>
    </div>
    <!-- end of mode switch -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ProvincesGeoJson from "~/mixins/ProvincesGeoJson.js";
import * as L from "leaflet";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  mixins: [ProvincesGeoJson],
  data() {
    return {
      map: {},
      tileLayer: {},
      provinces: {},
      provincesData: [],
      mapGuide: [],
      mapColors: ["#ffe9c5", "#ffc461", "#ffa000", "#cb7f00", "#8d5800"],
    };
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
      getMapID: "index/getMapID",
      getMapLevel: "index/getMapLevel",
      getDate: "filters/getDate",
      getFilters: "filters/getFilters",
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
            // 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
            "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlub29oYXJpciIsImEiOiJja2xkbGE2ZmgwcnY2MnFtMWtoOWl5dnpkIn0.umSsa-Et5gB6J96rzM4oWw";
          break;
        case "satellite":
          res =
            "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlub29oYXJpciIsImEiOiJja2xkbGE2ZmgwcnY2MnFtMWtoOWl5dnpkIn0.umSsa-Et5gB6J96rzM4oWw";
          break;
      }
      return res;
    },
    getMapData() {
      let vm = this;
      return vm
        .$axios({
          method: "post",
          url: "MapData",
          data: {
            mapLevel: this.getMapLevel,
            mapID: this.getMapID,
            ...this.getFilters,
          },
        })
        .then((response) => {
          vm.provincesData = response.data.detail;
        })
        .then((r) => this.drawProvinces())
        .then((re) => this.createMapGuide());
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
        vm.setMapCenter(vm.map.getCenter());
        vm.setMapMinLat(vm.map.getBounds()._southWest.lat);
        vm.setMapMinLng(vm.map.getBounds()._southWest.lng);
        vm.setMapMaxLat(vm.map.getBounds()._northEast.lat);
        vm.setMapMaxLng(vm.map.getBounds()._northEast.lng);
      });
    },
    drawProvinces() {
      let vm = this;
      vm.provinces = L.geoJSON(this.geoJsonContent, {
        style: function (feature) {
          return {
            color:
              vm.mapColors[
                vm.provincesData.polygons.filter(
                  (x) => x.englishName === feature.properties.engName
                )[0].colorLevel
              ],
            fillOpacity: 0.7,
            stroke: false,
          };
        },
      })
        .bindTooltip(
          function (layer) {
            return (
              layer.feature.properties.ostn_name +
              "<br />" +
              vm.provincesData.polygons.filter(
                (x) => x.englishName === layer.feature.properties.engName
              )[0].count
            );
          },
          { className: "font-serif", sticky: true }
        )
        .addTo(vm.map);
    },
    createMapGuide() {
      let vm = this;
      let mapColorsGuide = vm.provincesData.mapColorsGuide;
      let len = vm.provincesData.mapColorsGuide.length;

      vm.mapGuide = [];
      for (var i = 0; i < len + 1; i++) {
        if (i === 0)
          vm.mapGuide.push({
            caption: "کمتر از " + mapColorsGuide[i],
            color: vm.mapColors[i],
          });
        else if (i !== len)
          vm.mapGuide.push({
            caption:
              " از " + mapColorsGuide[i - 1] + " تا " + mapColorsGuide[i],
            color: vm.mapColors[i],
          });
        else
          vm.mapGuide.push({
            caption: "بیشتر از " + mapColorsGuide[i - 1],
            color: vm.mapColors[i],
          });
      }
    },
  },

  created() {
    this.getMapData();
  },
  mounted() {
    this.drawMap();
  },

  watch: {
    getMode(value) {
      this.tileLayer.setUrl(this.getMapAddress(value));
    },
    getMapID(val) {
      if (this.provinces != null) this.provinces.remove();
      this.getMapData();
    },
    getDate(val) {
      if (this.provinces != null) this.provinces.remove();
      this.getMapData();
    },
    getFilters() {
      if (this.provinces != null) this.provinces.remove();
      this.getMapData();
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
  visibility: hidden !important;
}
</style>