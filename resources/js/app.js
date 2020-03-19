import Vue from 'vue';
import axios from './axios'
import Buefy from 'buefy'
import router from './router';
import store from './store.js';
import i18n from './plugins/vuex-i18n'
import vueDebounce from 'vue-debounce'
import VueCurrencyFilter from 'vue-currency-filter'
import VueMoment from 'vue-moment'

Vue.use(VueCurrencyFilter,
    {
        symbol : 'SEK',
        thousandsSeparator: ' ',
        fractionCount: 0,
        fractionSeparator: '.',
        symbolPosition: 'back',
        symbolSpacing: true
    })

import moment from 'moment'
require('moment/locale/sv')
// App template
import App from './App.vue';

Vue.use(Buefy, {
    defaultDateFormatter: date => {
        return moment(date).format("YYYY-MM-DD");
    },
    defaultDateParser: date => {
        return moment(date, "YYYY-MM-DD").toDate();
    }
});
Vue.use(vueDebounce);
Vue.use(require('vue-moment'), {
    moment
})

new Vue({
    axios,
    store,
    router,
    ...App
}).$mount('#app');
