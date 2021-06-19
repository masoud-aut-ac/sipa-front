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
      return this.$axios({
        method: "get",
        url: "Province",
      }).then((response) => {
        this.provinceOptions = response.data.detail.provinces;
      });
    },
    getInfoSources() {
      return this.$axios({
        method: "get",
        url: "InfoSources",
      }).then((response) => {
        this.infoSourcesOptions = response.data.detail.infoSources;
      });
    },
    getInfoDevices() {
      return this.$axios({
        method: "get",
        url: "InfoDevices",
      }).then((response) => {
        this.infoDevicesOptions = response.data.detail.infoDevices;
      });
    },
    getVehicleTypes() {
      return this.$axios({
        method: "get",
        url: "VehicleType",
      }).then((response) => {
        this.vehicleTypeOptions = response.data.detail.vehicleTypes;
      });
    },
    getIncidentTypes() {
      return this.$axios({
        method: "get",
        url: "IncidentType",
      }).then((response) => {
        this.incidentTypeOptions = response.data.detail.incidentTypes;
      });
    },
    getIncidentParts() {
      return this.$axios({
        method: "get",
        url: "IncidentPart",
      }).then((response) => {
        this.incidentPartOptions = response.data.detail.incidentParts;
      });
    },
    getIncidentReasons() {
      return this.$axios({
        method: "get",
        url: "IncidentReason",
      }).then((response) => {
        this.incidentReasonOptions = response.data.detail.incidentsReasons;
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
