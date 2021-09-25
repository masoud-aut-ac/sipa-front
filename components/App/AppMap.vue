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
        <p class="mt-4">در حال بارگذاری اطلاعات</p>
      </v-overlay>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as L from "leaflet";
import { MarkerClusterGroup, MarkerCluster } from "leaflet.markercluster";
// import {} from "leaflet.markercluster.css";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  data() {
    return {
      isLoadingData: false,
      markersLayerGroup: null,
      map: {},
      tileLayer: {},
      mapFeatures: {},
      mapFeaturesData: [],
      mapGuide: [],
      image: null,
      mapColors: ["#332A7C", "#F25767", "#FFA000", "#736bb4", "#87DFF0"],
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
      let imageOverlayCoordinate =
        vm.getMapLevel === 2
          ? [
              [25.07442, 44.06878],
              [39.77609, 63.33307],
            ]
          : [
              [25.06242, 44.03878],
              [39.77609, 63.33307],
            ];
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
          if (vm.image !== null) vm.image.removeFrom(vm.map);
          vm.image = L.imageOverlay(
            "http://" + response.data.detail.imageURI,
            imageOverlayCoordinate,
            { opacity: 0.75 }
          );
          vm.image.addTo(vm.map);
          vm.drawMakers("http://" + response.data.detail.colorLevelsURI).then(
            (res) => (vm.isLoadingData = false)
          );
          vm.mapFeaturesData = response.data.detail;
        })
        .then((re) => this.createMapGuide());
    },
    drawMakers(jsonUrl) {
      let vm = this;
      return vm.$axios.get(jsonUrl).then((res) => {
        let markerList = [];
        let markers = L.markerClusterGroup({
          disableClusteringAtZoom: vm.getMapLevel === 2 ? 16 : 8,
          chunkedLoading: true,
          iconCreateFunction: function (cluster) {
            let children = cluster.getAllChildMarkers();
            let sum = 0;
            for (var i = 0; i < children.length; i++) {
              sum += children[i].value;
            }
            let c = " marker-cluster-";
            if (sum < 10) {
              c += "small";
            } else if (sum < 100) {
              c += "medium";
            } else {
              c += "large";
            }
            return new L.divIcon({
              html: "<div><span>" + sum + "</span></div>",
              className: "marker-cluster" + c,
              iconSize: new L.Point(40, 40),
            });
          },
        });
        if (vm.getMapLevel === 2) {
          res.data.forEach((element) => {
            let m = L.marker(element.LatLng, { title: "" + element.Value });
            m.value = element.Value;
            markerList.push(m);
          });
        } else {
          res.data.forEach((element) => {
            let m = L.marker(element.LatLng, {
              title: element.PersianName + " " + element.Value,
            });
            m.value = element.Value;
            markerList.push(m);
          });
        }
        markers.addLayers(markerList);
        vm.markersLayerGroup.clearLayers();
        vm.markersLayerGroup.addLayer(markers);
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
    createMapGuide() {
      let vm = this;
      let mapColorsGuide = vm.mapFeaturesData.mapColorsGuide;
      let len = vm.mapFeaturesData.mapColorsGuide.length;

      vm.mapGuide = [];
      for (var i = 0; i < len + 1; i++) {
        if (i === 0)
          vm.mapGuide.push(
            // len !== 1
            mapColorsGuide[0] !== 0
              ? {
                  caption: "کمتر از " + mapColorsGuide[i],
                  color: vm.mapColors[i],
                }
              : {
                  caption: mapColorsGuide[i],
                  color: vm.mapColors[i],
                }
          );
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
  beforeMount() {
    this.$nuxt.$on("update-sipa-map", () => {
      this.getMapData();
    });
  },
  watch: {
    getMapID(val) {
      this.getMapData();
    },
    getMapLevel(val) {
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

.leaflet-cluster-anim .leaflet-marker-icon,
.leaflet-cluster-anim .leaflet-marker-shadow {
  -webkit-transition: -webkit-transform 0.3s ease-out, opacity 0.3s ease-in;
  -moz-transition: -moz-transform 0.3s ease-out, opacity 0.3s ease-in;
  -o-transition: -o-transform 0.3s ease-out, opacity 0.3s ease-in;
  transition: transform 0.3s ease-out, opacity 0.3s ease-in;
}

.leaflet-cluster-spider-leg {
  /* stroke-dashoffset (duration and function) should match with leaflet-marker-icon transform in order to track it exactly */
  -webkit-transition: -webkit-stroke-dashoffset 0.3s ease-out,
    -webkit-stroke-opacity 0.3s ease-in;
  -moz-transition: -moz-stroke-dashoffset 0.3s ease-out,
    -moz-stroke-opacity 0.3s ease-in;
  -o-transition: -o-stroke-dashoffset 0.3s ease-out,
    -o-stroke-opacity 0.3s ease-in;
  transition: stroke-dashoffset 0.3s ease-out, stroke-opacity 0.3s ease-in;
}

.marker-cluster-small {
  background-color: rgba(110, 204, 57, 0.9);
}

.marker-cluster-medium {
  background-color: rgba(240, 194, 12, 0.9);
}

.marker-cluster-large {
  background-color: rgba(241, 128, 23, 0.9);
}

/* IE 6-8 fallback colors */
.leaflet-oldie .marker-cluster-small {
  background-color: rgb(181, 226, 140);
}
.leaflet-oldie .marker-cluster-small div {
  background-color: rgb(110, 204, 57);
}

.leaflet-oldie .marker-cluster-medium {
  background-color: rgb(241, 211, 87);
}
.leaflet-oldie .marker-cluster-medium div {
  background-color: rgb(240, 194, 12);
}

.leaflet-oldie .marker-cluster-large {
  background-color: rgb(253, 156, 115);
}
.leaflet-oldie .marker-cluster-large div {
  background-color: rgb(241, 128, 23);
}

.marker-cluster {
  background-clip: padding-box;
  border-radius: 20px;
}
.marker-cluster div {
  /* width: 30px; */
  height: 30px;
  /* margin-left: 5px; */
  margin-top: 5px;

  text-align: center;
  border-radius: 15px;
  font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.marker-cluster span {
  line-height: 30px;
}
</style>