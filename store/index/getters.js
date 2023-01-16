export default {
    getSidebar(state) {
        return state.sidebar;
    },
    getSideSheet(state) {
        return state.sideSheet;
    },
    getMapCenter(state) {
        return state.mapCenter;
    },
    getMapZoom(state) {
        return state.mapZoom;
    },
    getMapBounds(state) {
        return state.mapBounds;
    },
    getAggregationType(state) {
        return state.aggregationType;
    },
    getMapLevel(state) {
        return state.mapLevel;
    },
    getIndex(state) {
        return state.index;
    },
    getYear(state) {
        return state.year;
    },
    getDataCleaningDetail(state) {
        return state.dataCleaningDetail;
    },
    getLoggedInUser(state) {
        return state.loggedInUser;
    },
    getProvinceID(state){
        return state.provinceID;
    },
    getDensityType(state){
        return state.densityType;
    },
    getPlateRecord(state){
        return state.plateRecord;
    }
}