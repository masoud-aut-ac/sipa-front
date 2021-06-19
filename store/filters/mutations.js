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
        state.IncidentPartSelected = payload;
    },
    setIncidentReasonSelected(state, payload) {
        state.IncidentReasonSelected = payload;
    },
    addRemovedFilterIds(state, payload) {
        state.removedFilterIds.push(payload);
    },
    setRemovedFilterIds(state, payload) {
        state.removedFilterIds = payload;
    },
}