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
        persianTitle: "مسافت پیموده شده (کیلومتر)",
        value: 0,
        convert(x) {
            if (x != 0) {
                this.value = x;
            }
            else {
                this.value = "نامشخص";
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
    }
]

export function profileToPersonalIndexes(profile) {
    if (profile != null) {

        indexes.filter(x => x.index != "averageCrimePerKKM")
            .forEach(x => {
                x.convert(profile[x.index]);
            });
    }
    return indexes;
}
