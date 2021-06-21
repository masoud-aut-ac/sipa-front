import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      loadFilterOptions: "filters/loadFilterOptions",
    }),
    getProvinces() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "Province",
      }).then((response) => {
        vm.loadFilterOptions({
          englishLabel: "province", options: response.data.detail.provinces.map(x => { return { ...x, name: x.persianName } })
        });
      });
    },
    getInfoSources() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "InfoSources",
      }).then((response) => {
        vm.loadFilterOptions({
          englishLabel: "infoSource", options: response.data.detail.infoSources
        });
      });
    },
    getInfoDevices() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "InfoDevices",
      }).then((response) => {
        vm.loadFilterOptions({
          englishLabel: "infoDevice", options: response.data.detail.infoDevices
        });
      });
    },
    getVehicleTypes() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "VehicleType",
      }).then((response) => {
        vm.loadFilterOptions({
          englishLabel: "vehicleType", options: response.data.detail.vehicleTypes
        });
      });
    },
    getIncidentTypes() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "IncidentType",
      }).then((response) => {
        vm.loadFilterOptions({
          englishLabel: "incidentType", options: response.data.detail.incidentTypes
        });
      });
    },
    getIncidentParts() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "IncidentPart",
      }).then((response) => {
        vm.loadFilterOptions({
          englishLabel: "incidentPart", options: response.data.detail.incidentParts
        });
      });
    },
    getIncidentReasons() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "IncidentReason",
      }).then((response) => {
        vm.loadFilterOptions({
          englishLabel: "incidentReason", options: response.data.detail.incidentsReasons
        });
      });
    },
    loadAllFilters() {
      this.getProvinces();
      this.getInfoSources();
      this.getInfoDevices();
      this.getVehicleTypes();
      this.getIncidentTypes();
      this.getIncidentParts();
      this.getIncidentReasons();
    }
  },
}
