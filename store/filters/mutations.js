export default {
    setDate(state, payload) {
        state.date = payload;
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
    setHasComparsion(state, payload) {
        state.hasComparsion = payload;
    },
    setComparsionDetail(state, payload) {
        state.comparsionDetail = payload;
    }
}