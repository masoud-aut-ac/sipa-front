export const hazardIndexHeaders = [
    {
        text: "شاخص",
        align: "center",
        sortable: false,
        value: "persianTitle",
    },
    {
        text: "مقدار",
        align: "center",
        sortable: false,
        value: "value",
    },
]

const indexes = [
    {
        index: "distance_rank",
        persianTitle: "صدک خودرو براساس مسافت پیموده شده",
        value: 0,
        convert(x) { this.value = x }
    },
    {
        index: "hazard_Percentile",
        persianTitle: "صدک رانندگی خطرناک",
        value: 0,
        convert(x) { this.value = x }
    },
    {
        index: "crime_rank_all_plate_in_group",
        persianTitle: "صدک تخلف بین خودروهای همگروه",
        value: 0,
        convert(x) { this.value = x }
    },
    {
        index: "crime_rank_only_criminal_in_group",
        persianTitle: "صدک تخلف بین خودروهای متخلف",
        value: 0,
        convert(x) { this.value = x }
    },
]

export function profileToHazardIndexes(profile) {
    if (profile != null) {

        indexes.filter(x => x.index != "averageCrimePerKKM")
            .forEach(x => {
                x.convert(profile[x.index]);
            });
    }
    return indexes;
}
