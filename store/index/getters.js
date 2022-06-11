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
    getMapID(state) {
        return state.mapID;
    },
    getMapLevel(state) {
        return state.mapLevel;
    },
    getIndexType(state) {
        return state.indexType;
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
        return state.provinceID
    }
}