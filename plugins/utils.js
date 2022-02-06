export default (context, inject) => {
    // inject('commas', commas);
    inject('convertToDateTime', function (hisDate, hisTime) {
        let date = (hisDate / 10000).toFixed(0) + '/' + ((hisDate % 10000) / 100).toFixed(0).toString().padStart(2, '0') + '/' + (hisDate % 100).toString().padStart(2, '0');
        let time = Math.floor(hisTime / 100).toFixed(0).toString().padStart(2, '0') + ":" + (hisTime % 100).toString().padStart(2, '0');
        return { date, time };
    });
    // inject('convertFromDateTime', convertFromDateTime);
    // inject('checkIfFull', (a) => a.sumCheckout != a.price && a.sumDeposit == a.price);
    // inject('checkIfCheckedOut', (a) => a.sumCheckout == a.price);
    // inject('setInitailSearch', function (val, ref) {
    //     if (val.$refs[ref].value != null)
    //         val.$refs[ref].search = val.$refs[ref].value;
    // });
    // inject('formatShebaAndCardNumber', formatShebaAndCardNumber);
}