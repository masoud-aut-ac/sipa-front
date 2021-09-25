export default {
    setStartDate(state, payload) {
        state.startDate = payload;
    },
    setEndDate(state, payload) {
        state.endDate = payload;
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
    loadFilterOptions(state, payload) {
        let filter = state.details.find(x => x.englishLabel === payload.englishLabel);
        filter.options = payload.options;
    },
    setFilterValue(state, payload) {
        let filter = state.details.find(x => x.id === payload.id);
        filter.value = payload.value;
    },
    setHasComparison(state, payload) {
        state.hasComparison = payload;
    },
    setComparisonDetail(state, payload) {
        state.comparisonDetail = payload;
    }
}