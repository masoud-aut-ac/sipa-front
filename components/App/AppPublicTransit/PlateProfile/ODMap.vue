<template>
  <div light>
    <div id="map-wrap" class="z-0" style="direction: rtl; height: 400px"></div>
  </div>
</template>

<script>
import * as L from "leaflet";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import Provinces from "./Provinces.js";

export default {
  props: {
    ODes: {
      type: Array,
    },
  },
  data() {
    return {
      map: {},
      tileLayer: {},
      layerPoints: null,
      layerLines: null,
    };
  },
  methods: {
    drawMap() {
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
        "https://maptile1.141.ir/tile/v1/3/{z}/{x}/{y}"
      );
      this.tileLayer.addTo(this.map);

      let myRenderer = L.canvas({ padding: 0.5 });

      let screenShoter = new SimpleMapScreenshoter();
      screenShoter.addTo(this.map);
      this.map.setView([32.03602003973757, 54.23950195312501], 5);
    },
    drawLines() {
      let myRenderer = L.canvas({ padding: 0.5 });

      let lines = this.ODes.map((x) => {
        let originLatLon = Provinces.find((y) => x.origin.includes(y.name));
        let destinationLatLon = Provinces.find((y) =>
          x.destination.includes(y.name)
        );
        if (originLatLon != null && destinationLatLon != null) {
          let line = L.polyline(
            [
              new L.LatLng(
                originLatLon.CenterLatitude,
                originLatLon.CenterLongitude
              ),
              new L.LatLng(
                destinationLatLon.CenterLatitude,
                destinationLatLon.CenterLongitude
              ),
            ],
            {
              fillColor: "#FFA000",
              color: "#FFA000",
              renderer: myRenderer,
              weight: x.Percent * 10 + 3,
              fillOpacity: 0.5,
            }
          );
          return line;
        }
        return null;
      }).filter((x) => x != null);
      let newLayerLines = L.layerGroup(lines);
      newLayerLines.addTo(this.map);

      if (this.layerLines != null) this.layerLines.clearLayers();
      this.layerLines = newLayerLines;
    },
    drawPoints() {
      if (this.ODes.length > 0) {
        let myRenderer = L.canvas({ padding: 0.5 });
        let markers = this.ODes.reduce(
          (res, x) => res.concat([x.origin, x.destination]),
          []
        )
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((x) => {
            let p = Provinces.find((y) => x.includes(y.name));
            if (p != null) {
              return L.circleMarker([p.CenterLatitude, p.CenterLongitude], {
                radius: 10,
                renderer: myRenderer,
                fillColor: "#FFA000",
                color: "black",
                weight: 0.5,
                fillOpacity: 0.7,
              }).bindTooltip(x, {
                direction: "right",
                sticky: true,
                className: "font-serif",
              });
            }
            return null;
          })
          .filter((x) => x != null);

        let newLayerPoints = L.layerGroup(markers);
        newLayerPoints.addTo(this.map);
        if (this.layerPoints != null) this.layerPoints.clearLayers();
        this.layerPoints = newLayerPoints;

        // this.map.fitBounds(new L.featureGroup(markers).getBounds());
      }
    },
  },
  watch: {
    ODes() {
      this.drawLines();
      this.drawPoints();
    },
  },
  mounted() {
    this.drawMap();
    this.drawLines();
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