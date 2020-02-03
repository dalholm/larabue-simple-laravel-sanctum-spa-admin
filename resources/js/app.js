import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

import Buefy from 'buefy'
import router from './router';

import store from './store.js';

import App from './App.vue';


Vue.use(VueAxios, axios);
Vue.use(Buefy);

new Vue({
    store,
    router,
    ...App
}).$mount('#app');
