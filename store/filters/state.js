export default () => ({
    date: ["1398/01/01", "1398/03/01"],
    hasLoadedFilters: false,
    removedFilterIds: [],
    hasComparison: false,
    comparisonDetail: null,
    details: [{
        id: 0,
        label: "استان",
        englishLabel: "province",
        labelChip: "",
        apiRequestLabel: "provinceEnglishName",
        value: null,
        options: [],
    },
    {
        id: 1,
        label: "منبع دریافت پیام",
        englishLabel: "infoSource",
        labelChip: "",
        apiRequestLabel: "infoSource",
        value: null,
        options: [],
    },
    {
        id: 2,
        label: "وسیله دریافت پیام",
        englishLabel: "infoDevice",
        labelChip: "",
        apiRequestLabel: "infoDevice",
        value: null,
        options: [],
    },
    {
        id: 3,
        label: "تعداد مجروحان هر تصادف",
        englishLabel: "injuredCount",
        labelChip: "مجروح",
        apiRequestLabel: "injuredCount",
        value: null,
        options: [],
    },
    {
        id: 4,
        label: "تعداد فوتی‌های هر تصادف",
        englishLabel: "deadCount",
        labelChip: "فوتی",
        apiRequestLabel: "deadCount",
        value: null,
        options: [],
    },
    // {
    //     id: 5,
    //     label: "تعداد وسایل در هر تصادف",
    //     englishLabel: "vehicleCount",
    //     apiRequestLabel: "vehicleCount",
    //     value: null,
    //     options: [],
    // },
    {
        id: 6,
        label: "انواع وسایل در هر تصادف",
        englishLabel: "vehicleType",
        labelChip: "",
        apiRequestLabel: "vehicleType",
        value: null,
        options: [],
    },
    {
        id: 7,
        label: "انواع برخورد",
        englishLabel: "incidentType",
        labelChip: "",
        apiRequestLabel: "incidentType",
        value: null,
        options: [],
    },
    {
        id: 8,
        label: "شکل برخورد",
        englishLabel: "incidentPart",
        labelChip: "",
        apiRequestLabel: "incidentPart",
        value: null,
        options: [],
    },
    {
        id: 9,
        label: "علت تامه تصادف",
        englishLabel: "incidentReason",
        labelChip: "",
        apiRequestLabel: "incidentReason",
        value: null,
        options: [],
    }]
})