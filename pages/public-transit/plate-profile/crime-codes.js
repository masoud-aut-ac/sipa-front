export const crimes = [
    {
        code: 2002,
        title: "بیش از ۵۰ کیلومتر بر ساعت تجاوز از سرعت مجاز"
    },
    {
        code: 2008,
        title: "بین ۳۰ تا ۵۰ کیلومتر بر ساعت تجاوز از سرعت مجاز"
    },
    {
        code: 2056,
        title: "تا ۳۰ کیلومتر بر ساعت تجاوز از سرعت مجاز"
    },
    {
        code: 2020,
        title: "تخلف وزن محور"
    },
    {
        code: 2030,
        title: "عبور خودروهای سنگین از لاین غیرمجاز"
    }
]

export function crimeCodesToPieChartSlices(crimeCodes) {
    if (crimeCodes != null && crimeCodes.length) {
        var codesCount = crimeCodes
            .reduce((res, x) => res.concat(x[0]), [])
            .reduce((res, x) => {
                if (res[x] == null) {
                    res[x] = 0;
                }
                res[x] += 1; return res;
            }, {});

        return crimes.map(x => [x.title, codesCount[x.code] || 0]);
    }
    else {
        return [];
    }
}