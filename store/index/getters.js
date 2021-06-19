export default {
    getMode(state) {
        return state.mode;
    },
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
    getMapMinLat(state) {
        return state.mapMinLat;
    },
    getMapMinLng(state) {
        return state.mapMinLng;
    },
    getMapMaxLat(state) {
        return state.mapMaxLat;
    },
    getMapMaxLng(state) {
        return state.mapMaxLng;
    },
}