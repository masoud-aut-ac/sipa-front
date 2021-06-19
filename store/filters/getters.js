export default {
    getDate(state) {
        return state.date;
    },
    getHasLoadedFilters(state) {
        return state.hasLoadedFilters;
    },
    getProvinceSelected(state) {
        return state.provinceSelected;
    },
    getInfoSourceSelected(state) {
        return state.infoSourceSelected;
    },
    getInfoDeviceSelected(state) {
        return state.infoDeviceSelected;
    },
    getInjuriesCountSelected(state) {
        return state.injuriesCountSelected;
    },
    getDeadCountSelected(state) {
        return state.deadCountSelected;
    },
    getVehicleCountSelected(state) {
        return state.vehicleCountSelected;
    },
    getVehicleTypeSelected(state) {
        return state.vehicleTypeSelected;
    },
    getIncidentTypeSelected(state) {
        return state.incidentTypeSelected;
    },
    getIncidentPartSelected(state) {
        return state.incidentPartSelected;
    },
    getIncidentReasonSelected(state) {
        return state.incidentReasonSelected;
    },
    getRemovedFilterIds(state) {
        return state.removedFilterIds;
    },
    getProvinces(state) {
        return state.provinces;
    },
    getInfoSources(state) {
        return state.infoSources;
    },
    getInfoDevices(state) {
        return state.infoDevices;
    },
    getVehicleTypes(state) {
        return state.vehicleTypes;
    },
    getIncidentTypes(state) {
        return state.incidentTypes;
    },
    getIncidentParts(state) {
        return state.incidentParts;
    },
    getIncidentReasons(state) {
        return state.incidentReasons;
    },
}