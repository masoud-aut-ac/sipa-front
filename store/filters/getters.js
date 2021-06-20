export default {
    getDate(state) {
        return state.date;
    },
    getRemovedFilterIds(state) {
        return state.removedFilterIds;
    },
    getFilterDetails(state) {
        return state.details;
    },
    getFilters(state) {
        let res = {
            startTime: state.date[0].replaceAll("/", "-") + " 00:00",
            endTime: state.date[1].replaceAll("/", "-") + " 23:59",
        }
        state.details.filter(x => x.englishLabel !== 'province').forEach(x => res[x.englishLabel] = x.value);
        let provinceFilter = state.details.find(x => x.englishLabel === 'province');
        if (provinceFilter.value != null)
            res['provinceEnlighName'] = provinceFilter
                .options
                .find(x => x.id === selectedProvince.value)
                .englishName;
        return res;
    },
    getHasComparison(state) {
        return state.hasComparsion;
    },
    getComparisonDetail(state) {
        return state.comparisonDetail;
    }
}