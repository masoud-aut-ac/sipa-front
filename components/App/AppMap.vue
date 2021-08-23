<template>
  <div>
    <div
      id="map-wrap"
      class="z-0 rounded-lg shadow-md"
      style="direction: rtl; height: 100vh"
    >
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
    </div>
    <div v-if="isLoadingData" class="text-center">
      <v-overlay :value="true" z-index="510">
        <v-progress-circular
          indeterminate
          :size="64"
          color="#FFA000"
        ></v-progress-circular>
      </v-overlay>
    </div>
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
      isLoadingData: false,
      map: {},
      tileLayer: {},
      mapFeatures: {},
      mapFeaturesData: [],
      mapGuide: [],
      mapColors: ["#ffe9c5", "#ffc461", "#ffa000", "#cb7f00", "#8d5800"],
    };
  },
  computed: {
    ...mapGetters({
      getMapZoom: "index/getMapZoom",
      getMapCenter: "index/getMapCenter",
      getMapBounds: "index/getMapBounds",
      getMapLevel: "index/getMapLevel",
      getMapID: "index/getMapID",
      getFilters: "filters/getFilters",
    }),
  },
  methods: {
    ...mapMutations({
      setMapZoom: "index/setMapZoom",
      setMapCenter: "index/setMapCenter",
      setMapBounds: "index/setMapBounds",
      setMapLevel: "index/setMapLevel",
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
            ...this.getMapBounds,
            ...this.getFilters,
          },
        })
        .then((response) => {
          vm.mapFeaturesData = response.data.detail;
        })
        .then((r) => {
          this.drawFeatures();
        })
        .then((re) => this.createMapGuide())
        .then((res) => (vm.isLoadingData = false));
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

      vm.map.on("zoomend", function () {
        let z = vm.map.getZoom();
        vm.setMapZoom(z);
        if (z < 8) vm.setMapLevel(0);
        else if (8 <= z && z <= 12) vm.setMapLevel(1);
        else if (z >= 13) vm.setMapLevel(2);

        vm.setMapCenter(vm.map.getCenter());
        vm.setMapBounds({
          minLat: vm.map.getBounds()._southWest.lat,
          minLon: vm.map.getBounds()._southWest.lng,
          maxLat: vm.map.getBounds()._northEast.lat,
          maxLon: vm.map.getBounds()._northEast.lng,
        });
      });

      vm.map.on("moveend", function () {
        vm.setMapCenter(vm.map.getCenter());
        vm.setMapBounds({
          minLat: vm.map.getBounds()._southWest.lat,
          minLon: vm.map.getBounds()._southWest.lng,
          maxLat: vm.map.getBounds()._northEast.lat,
          maxLon: vm.map.getBounds()._northEast.lng,
        });
          console.log(vm.getMapBounds);
      });
    },

    drawFeatures() {
      let vm = this;
      vm.mapFeatures = L.geoJSON(vm.mapFeaturesData.geoJson, {
        style: function (feature) {
          return {
            color: vm.mapColors[feature.properties.colorLevel],
            fillOpacity: 0.7,
            stroke: vm.getMapLevel === 2 ? true : false,
          };
        },
      })
        .bindTooltip(
          function (layer) {
            return (
              layer.feature.properties.persianName +
              "<br />" +
              layer.feature.properties.count
            );
          },
          { className: "font-serif", sticky: true }
        )
        .addTo(vm.map);
    },

    createMapGuide() {
      let vm = this;
      let mapColorsGuide = vm.mapFeaturesData.mapColorsGuide;
      let len = vm.mapFeaturesData.mapColorsGuide.length;

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
    getFilters() {
      if (this.mapFeatures != null) {
        this.mapFeatures.remove();
        this.getMapData();
      }
    },
    getMapID(val) {
      if (this.mapFeatures != null) {
        this.mapFeatures.remove();
        this.getMapData();
      }
    },
    getMapBounds(val) {
      if (this.mapFeatures != null) {
        this.mapFeatures.remove();
        this.getMapData();
      }
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