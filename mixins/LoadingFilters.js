import { mapGetters, mapMutations } from "vuex";
import state from "~/store/filters/state";

export default {
  computed: {
    ...mapGetters({
      getFilters: "filters/getFilters",
      getProvince: "filters/getProvince"
    })
  },
  methods: {
    ...mapMutations({
      loadFilterOptions: "filters/loadFilterOptions",
      setProvince: "filters/setProvince",
      setCity: "filters/setCity",
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
        vm.setProvince(vm.getFilters.provinceEnglishName);
        vm.loadFilterOptions({
          englishLabel: "city", options: response.data.detail.provinces.find(x => vm.getFilters.provinceEnglishName === x.englishName).cities.map(x => { return { ...x, name: x.persianName } })
        });
      })
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
    getInjuriesCount() {
      let vm = this;
      vm.loadFilterOptions({
        englishLabel: "injuredCount", options: [
          { id: 0, name: "صفر" },
          { id: 1, name: "یک" },
          { id: 2, name: "دو" },
          { id: 3, name: "سه و بیشتر" },
        ]
      })
    },
    getDeadCount() {
      let vm = this;
      vm.loadFilterOptions({
        englishLabel: "deadCount", options: [
          { id: 0, name: "صفر" },
          { id: 1, name: "یک" },
          { id: 2, name: "دو" },
          { id: 3, name: "سه و بیشتر" },
        ]
      })
    },
    getIncidentInjuriesTypes() {
      let vm = this;
      return this.$axios({
        method: "get",
        url: "IncidentInjuriesType",
      }).then((response) => {
        vm.loadFilterOptions({
          englishLabel: "incidentInjuriesType", options: response.data.detail.incidentInjuriesTypes
        });
      });
    },
    // getVehicleCount() {
    //   let vm = this;
    //   vm.loadFilterOptions({
    //     englishLabel: "vehicleCount", options: [
    //       { id: 0, name: "نامشخص" },
    //       { id: 1, name: "یک" },
    //       { id: 2, name: "دو" },
    //       { id: 3, name: "سه و بیشتر" },
    //     ]
    //   })
    // },
    loadAllFilters() {
      this.getProvinces();
      this.getInfoSources();
      this.getInfoDevices();
      this.getVehicleTypes();
      this.getIncidentTypes();
      this.getIncidentParts();
      this.getIncidentReasons();
      this.getInjuriesCount();
      this.getDeadCount();
      this.getIncidentInjuriesTypes();
      // this.getVehicleCount();
    }
  },
  watch: {
    getProvince() {
      this.setCity(null);
      this.getProvinces();
    }
  }
}
