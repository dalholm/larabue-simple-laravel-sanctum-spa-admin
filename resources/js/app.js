import Vue from 'vue';
import axios from './axios'
import Buefy from 'buefy'
import router from './router';
import store from './store.js';
import i18n from './plugins/vue-i18n'
import VueGoogleCharts from 'vue-google-charts'

// App template
import App from './App.vue';

Vue.use(Buefy);
Vue.use(VueGoogleCharts);

console.log(i18n);

new Vue({
    i18n,
    axios,
    store,
    router,
    ...App
}).$mount('#app');
