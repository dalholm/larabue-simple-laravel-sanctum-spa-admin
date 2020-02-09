import Vue from 'vue';
import axios from './axios'

import Buefy from 'buefy'
import router from './router';
import store from './store.js';
import VueGoogleCharts from 'vue-google-charts'

import App from './App.vue';


Vue.use(Buefy);
Vue.use(VueGoogleCharts);

new Vue({
    store,
    router,
    ...App
}).$mount('#app');
