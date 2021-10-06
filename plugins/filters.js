import Vue from 'vue';

Vue.filter('commas', function (x) {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});