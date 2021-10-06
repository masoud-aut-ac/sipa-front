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
      mapFeaturesData: [],
      layerPoints: null,
      points: [],
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
    drawMap() {
      let vm = this;
      const L = require("leaflet");

      vm.map = L.map("map-wrap", {
        minZoom: 5,
        maxZoom: 16,
        maxBounds: [
          [41.44272637767212, 89.07714843750001],
          [23.483400654325642, 19.511718750000004],
        ],
        drawControl: true,
      });

      vm.tileLayer = L.tileLayer(
        "https://maptile1.141.ir/tile/v1/1/{z}/{x}/{y}"
      );
      vm.tileLayer.addTo(vm.map);

      let myRenderer = L.canvas({ padding: 0.5 });

      // const searchControl = new GeoSearchControl({
      //   style: "button",
      //   provider: new OpenStreetMapProvider(),
      // });
      // vm.map.addControl(searchControl);

      let screenShoter = new SimpleMapScreenshoter();
      screenShoter.addTo(vm.map);

      let center = vm.getMapCenter;
      let zoom = vm.getMapZoom;
      vm.map.setView(center, zoom);
    },
    drawPoints() {
      let vm = this;

      return vm
        .$axios({
          method: "post",
          url: "GeneralSummuryMap",
          data: this.getFilters,
        })
        .then((response) => {
          vm.mapFeaturesData = response.data.detail.points;
        })
        .then((r) => {
          let myRenderer = L.canvas({ padding: 0.5 });
          vm.mapFeaturesData.forEach((p) => {
            let point = L.circleMarker([p.latitude, p.longitude], {
              radius: 4,
              renderer: myRenderer,
              fillColor: p.countDead === 0 ? "#F7FF00" : "#FF0000",
              color: "black",
              weight: 0.5,
              fillOpacity: 1,
            }).bindTooltip(
              "تعداد جرحی: " +
                p.countInjury +
                "<br/> تعداد فوتی: " +
                p.countDead,
              {
                direction: "right",
                sticky: true,
                className: "font-serif",
              }
            );
            vm.points.push(point);
          });

          let newLayerPoints = L.layerGroup(vm.points);
          newLayerPoints.addTo(vm.map);
          if (vm.layerPoints != null) vm.layerPoints.clearLayers();
          vm.layerPoints = newLayerPoints;
          
          vm.map.fitBounds(L.featureGroup(vm.points).getBounds());
        });
    },
  },
  beforeMount() {
    this.$nuxt.$on("update-sipa-general", () => {
      this.drawPoints();
    });
  },
  mounted() {
    this.drawMap();
    this.drawPoints();
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