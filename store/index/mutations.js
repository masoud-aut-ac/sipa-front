export default {
    setSidebar(state, payload) {
        state.sidebar = payload;
    },
    setSideSheet(state, payload) {
        state.sideSheet = payload;
    },
    setMapCenter(state, payload) {
        state.mapCenter = payload;
    },
    setMapZoom(state, payload) {
        state.mapZoom = payload;
    },
    setMapBounds(state, payload) {
        state.mapBounds = payload;
    },
    setMapMinLat(state, payload) {
        state.mapMinLat = payload;
    },
    setMapMinLng(state, payload) {
        state.mapMinLng = payload;
    },
    setMapMaxLat(state, payload) {
        state.mapMaxLat = payload;
    },
    setMapMaxLng(state, payload) {
        state.mapMaxLng = payload;
    },
    setMapID(state, payload) {
        state.mapID = payload;
    },
    setMapLevel(state, payload) {
        state.mapLevel = payload;
    },
    setIndexType(state, payload) {
        state.indexType = payload;
    },
    setYear(state, payload) {
        state.year = payload;
    },
    setDataCleaningDetail(state, payload) {
        state.dataCleaningDetail = payload;
    },
    setLoggedInUser(state, payload) {
        state.loggedInUser = payload;
    },
}