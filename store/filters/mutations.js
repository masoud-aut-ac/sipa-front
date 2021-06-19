export default {
    setDate(state, payload) {
        state.date = payload;
    },
    setInfoSourceSelected(state, payload) {
        state.infoSourceSelected = payload;
    },
    setInfoDeviceSelected(state, payload) {
        state.infoDeviceSelected = payload;
    },
    setInjuriesCountSelected(state, payload) {
        state.injuriesCountSelected = payload;
    },
    setDeadCountSelected(state, payload) {
        state.deadCountSelected = payload;
    },
    setVehicleCountSelected(state, payload) {
        state.vehicleCountSelected = payload;
    },
    setVehicleTypeSelected(state, payload) {
        state.vehicleTypeSelected = payload;
    },
    setIncidentTypeSelected(state, payload) {
        state.incidentTypeSelected = payload;
    },
    setIncidentPartSelected(state, payload) {
        state.incidentPartSelected = payload;
    },
    setIncidentReasonSelected(state, payload) {
        state.incidentReasonSelected = payload;
    },
    addRemovedFilterIds(state, payload) {
        state.removedFilterIds.push(payload);
    },
    deleteRemovedFilterIds(state, payload) {
        state.removedFilterIds = state.removedFilterIds.filter(x => x !== payload);
    },
    setRemovedFilterIds(state, payload) {
        state.removedFilterIds = payload;
    },
    setInfoSources(state, payload) {
        state.infoSources = payload;
    },
    setInfoDevices(state, payload) {
        state.infoDevices = payload;
    },
    setVehicleTypes(state, payload) {
        state.vehicleTypes = payload;
    },
    setIncidentTypes(state, payload) {
        state.incidentTypes = payload;
    },
    setIncidentParts(state, payload) {
        state.incidentParts = payload;
    },
    setIncidentReasons(state, payload) {
        state.incidentReasons = payload;
    },
    setProvinces(state, payload) {
        state.provinces = payload;
    },
    setProvinceSelected(state, payload) {
        state.provinceSelected = payload;
    },
}