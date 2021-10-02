<template>
  <div light>
    <div id="map-wrap" class="z-0" style="direction: rtl; height: 400px"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as L from "leaflet";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  data() {
    return {
      isLoadingData: true,
      map: {},
      tileLayer: {},
      mapFeatures: {},
      mapFeaturesData: [],
      image: null,
      mapColors: ["#87DFF0", "#736bb4", "#FFA000", "#F25767", "#8B0000"],
    };
  },
  computed: {
    ...mapGetters({
      getMapZoom: "index/getMapZoom",
      getMapCenter: "index/getMapCenter",
      getMapBounds: "index/getMapBounds",
      getFilters: "filters/getFilters",
    }),
  },
  methods: {
    ...mapMutations({
      setMapZoom: "index/setMapZoom",
      setMapCenter: "index/setMapCenter",
      setMapBounds: "index/setMapBounds",
    }),
    getMapData() {
      let vm = this;
      vm.isLoadingData = true;
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
          vm.mapFeaturesData = response.data.detail;
        });
    },
    drawMap() {
      let vm = this;
      const L = require("leaflet");

      this.map = L.map("map-wrap", {
        minZoom: 5,
        maxZoom: 16,
        maxBounds: [
          [41.44272637767212, 89.07714843750001],
          [23.483400654325642, 19.511718750000004],
        ],
        drawControl: true,
      });

      this.tileLayer = L.tileLayer(
        "https://maptile1.141.ir/tile/v1/1/{z}/{x}/{y}"
      );
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

      this.markersLayerGroup = L.layerGroup().addTo(vm.map);
    },
  },
  created() {
    // this.getMapData();
  },
  mounted() {
    this.drawMap();
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