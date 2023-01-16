export const personalIndexHeaders = [
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
        index: "distance",
        persianTitle: "مسافت پیموده شده",
        value: 0,
        convert(x) {
            if (x != 0) {
                this.value = x + "کیلومتر";
            }
            else {
                this.value = "نامشخص";
            }
        },
    },
    {
        index: "averageCrimePerKKM",
        persianTitle: "تعداد تخلف بر هزار کیلومتر رانندگی",
        value: 0,
        convert(distance, crimeCodes) {
            if (distance != 0) {
                if (crimeCodes != 0) {
                    let crimesCount = crimeCodes
                        .map(x => x[0].length)
                        .reduce((res, x) => res + x, 0);

                    this.value = crimesCount * 100 / distance;
                }
                this._show = true;
            }
        },
    },
    {
        index: "last_trip_distance",
        persianTitle: "مسافت پیموده شده در آخرین سفر",
        value: 0,
        convert(x) {
            if (x != 0) {
                this.value = x + "کیلومتر";
            }
            else {
                this.value = "نامشخص";
            }
        },
    },
    {
        index: "last_trip_time",
        persianTitle: "مدت زمان آخرین سفر",
        value: 0,
        convert(x) {
            if (x != 0) {
                this.value = Math.floor(x / 3600) + ":"
                    + Math.floor((x % 3600) / 60).toString().padStart(2, "0");
            }
            else {
                this.value = "نامشخص";
            }
        },
    },
    {
        index: "seen_in_50KM",
        persianTitle: "تعداد مشاهده درایستگاه‌های نزدیک سانحه",
        value: 0,
        convert(x) { this.value = x }
    },
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

export function profileToPersonalIndexes(profile) {
    if (profile != null) {

        indexes.filter(x => x.index != "averageCrimePerKKM")
            .forEach(x => {
                x.convert(profile[x.index]);
            });
        indexes.find(x => x.index == "averageCrimePerKKM")
            .convert(profile.distance, profile.crimeCodes);
    }
    return indexes;
}
