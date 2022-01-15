import { mapGetters } from "vuex";

export default {
    data() {
        return {
            headersSimilars0: [
                {
                    text: "مرکز پلیس",
                    align: "center",
                    sortable: false,
                    value: "police",
                    class: "bg-green-900",
                },
                {
                    text: "محل تصادف",
                    align: "center",
                    sortable: false,
                    value: "location",
                    class: "bg-green-900",
                },
                {
                    text: "نوع برخورد",
                    align: "center",
                    sortable: false,
                    value: "incidentType",
                    class: "bg-green-900",
                },
                {
                    text: "فاصله (کیلومتر)",
                    align: "center",
                    sortable: false,
                    value: "distance",
                    class: "bg-green-900",
                },
            ],
            headersSimilars1: [
                {
                    text: "ساعت",
                    align: "center",
                    sortable: false,
                    value: "time",
                    class: "bg-green-400",
                },
                {
                    text: "مرکز پلیس",
                    align: "center",
                    sortable: false,
                    value: "police",
                    class: "bg-green-400",
                },
                {
                    text: "محل تصادف",
                    align: "center",
                    sortable: false,
                    value: "location",
                    class: "bg-green-400",
                },
                {
                    text: "نوع برخورد",
                    align: "center",
                    sortable: false,
                    value: "incidentType",
                    class: "bg-green-400",
                },
                {
                    text: "فاصله (کیلومتر)",
                    align: "center",
                    sortable: false,
                    value: "distance",
                    class: "bg-green-400",
                },
            ],
            headersSimilars2: [
                {
                    text: "روز",
                    align: "center",
                    sortable: false,
                    value: "date",
                    class: "bg-yellow",
                },
                {
                    text: "ساعت",
                    align: "center",
                    sortable: false,
                    value: "time",
                    class: "bg-yellow",
                },
                {
                    text: "محل تصادف",
                    align: "center",
                    sortable: false,
                    value: "location",
                    class: "bg-yellow",
                },
                {
                    text: "تعداد فوتی",
                    align: "center",
                    sortable: false,
                    value: "deadCount",
                    class: "bg-yellow",
                },
                {
                    text: "تعداد مجروح",
                    align: "center",
                    sortable: false,
                    value: "injuredCount",
                    class: "bg-yellow",
                },
                {
                    text: "نوع برخورد",
                    align: "center",
                    sortable: false,
                    value: "incidentType",
                    class: "bg-yellow",
                },
                {
                    text: "فاصله (کیلومتر)",
                    align: "center",
                    sortable: false,
                    value: "distance",
                    class: "bg-yellow",
                },
            ],
            headersSimilars3: [
                {
                    text: "روز",
                    align: "center",
                    sortable: false,
                    value: "date",
                    class: "bg-orange",
                },
                {
                    text: "ساعت",
                    align: "center",
                    sortable: false,
                    value: "time",
                    class: "bg-orange",
                },
                {
                    text: "محل تصادف",
                    align: "center",
                    sortable: false,
                    value: "location",
                    class: "bg-orange",
                },
                {
                    text: "تعداد فوتی",
                    align: "center",
                    sortable: false,
                    value: "deadCount",
                    class: "bg-orange",
                },
                {
                    text: "تعداد مجروح",
                    align: "center",
                    sortable: false,
                    value: "injuredCount",
                    class: "bg-orange",
                },
                {
                    text: "نوع برخورد",
                    align: "center",
                    sortable: false,
                    value: "incidentType",
                    class: "bg-orange",
                },
                {
                    text: "فاصله (کیلومتر)",
                    align: "center",
                    sortable: false,
                    value: "distance",
                    class: "bg-orange",
                },
            ],
            headersSimilars4: [
                {
                    text: "روز",
                    align: "center",
                    sortable: false,
                    value: "date",
                    class: "bg-red",
                },
                {
                    text: "ساعت",
                    align: "center",
                    sortable: false,
                    value: "time",
                    class: "bg-red",
                },
                {
                    text: "محل تصادف",
                    align: "center",
                    sortable: false,
                    value: "location",
                    class: "bg-red",
                },
                {
                    text: "تعداد فوتی",
                    align: "center",
                    sortable: false,
                    value: "deadCount",
                    class: "bg-red",
                },
                {
                    text: "تعداد مجروح",
                    align: "center",
                    sortable: false,
                    value: "injuredCount",
                    class: "bg-red",
                },
                {
                    text: "نوع برخورد",
                    align: "center",
                    sortable: false,
                    value: "incidentType",
                    class: "bg-red",
                },
                {
                    text: "فاصله (کیلومتر)",
                    align: "center",
                    sortable: false,
                    value: "distance",
                    class: "bg-red",
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            getSimilarityID: "index/getSimilarityID"
        }),
        tableHeadersColor() {
            let res;
            switch (this.getSimilarityID) {
                case 1:
                    res = 'bg-green-900';
                    break;
                case 2:
                    res = 'bg-green-400';
                    break;
                case 3:
                    res = 'bg-yellow';
                    break;
                case 4:
                    res = 'bg-orange';
                    break;
                case 5:
                    res = 'bg-red';
                    break;
                case 6:
                    res = 'bg-red-900';
                    break;

            }
            return res;
        },
        headers() {
            return [
                {
                    text: "روز تصادف",
                    align: "center",
                    sortable: false,
                    value: "date",
                    class: this.tableHeadersColor,
                },
                {
                    text: "ساعت تصادف",
                    sortable: false,
                    align: "center",
                    value: "time",
                    class: this.tableHeadersColor,
                },
                {
                    text: "محل تصادف",
                    sortable: false,
                    align: "center",
                    value: "location",
                    class: this.tableHeadersColor,
                },
                {
                    text: "تعداد فوتی",
                    sortable: false,
                    align: "center",
                    value: "deadCount",
                    class: this.tableHeadersColor,
                },
                {
                    text: "تعداد مجروح",
                    sortable: false,
                    align: "center",
                    value: "injuredCount",
                    class: this.tableHeadersColor,
                },
                {
                    text: "نوع برخورد",
                    sortable: false,
                    align: "center",
                    value: "incidentType",
                    class: this.tableHeadersColor,
                },
            ]
        }
    }
}