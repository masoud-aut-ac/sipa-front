import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      setProvinces: "filters/setProvinces",
      setInfoSources: "filters/setInfoSources",
      setInfoDevices: "filters/setInfoDevices",
      setVehicleTypes: "filters/setVehicleTypes",
      setIncidentTypes: "filters/setIncidentTypes",
      setIncidentParts: "filters/setIncidentParts",
      setIncidentReasons: "filters/setIncidentReasons",
    }),
    getProvinces() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "Province",
      }).then((response) => {
        vm.setProvinces(response.data.detail.provinces);
      });
    },
    getInfoSources() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "InfoSources",
      }).then((response) => {
        vm.setInfoSources(response.data.detail.infoSources);
      });
    },
    getInfoDevices() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "InfoDevices",
      }).then((response) => {
        vm.setInfoDevices(response.data.detail.infoDevices);
      });
    },
    getVehicleTypes() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "VehicleType",
      }).then((response) => {
        vm.setVehicleTypes(response.data.detail.vehicleTypes);
      });
    },
    getIncidentTypes() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "IncidentType",
      }).then((response) => {
        vm.setIncidentTypes(response.data.detail.incidentTypes);
      });
    },
    getIncidentParts() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "IncidentPart",
      }).then((response) => {
        vm.setIncidentParts(response.data.detail.incidentParts);
      });
    },
    getIncidentReasons() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "IncidentReason",
      }).then((response) => {
        vm.setIncidentReasons(response.data.detail.incidentsReasons);
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
