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
    getFilters(state) {
        return {
            startTime: state.date[0].replaceAll("/", "-") + " 00:00",
            endTime: state.date[1].replaceAll("/", "-") + " 23:59",
            provineEnglishName: state.provinceSelected,
            infoSource: state.infoSourceSelected,
            infoDevice: state.infoDeviceSelected,
            injuredCount: parseInt(state.injuriesCountSelected),
            deadCount: parseInt(state.deadCountSelected),
            vehicleCount: parseInt(state.vehicleCountSelected),
            vehicleType: state.vehicleTypeSelected,
            incidentType: state.incidentTypeSelected,
            incidentPart: state.incidentPartSelected,
            incidentReason: state.incidentReasonSelected,
        }
    }
}