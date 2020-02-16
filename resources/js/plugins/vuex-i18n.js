// load vue and vuex instance
import Vue from 'vue';
import store from '../store.js';
import axios from '../axios';

// load vuex i18n module
import vuexI18n from 'vuex-i18n';

Vue.use(vuexI18n.plugin, store);

const default_lang = window.config.locale;

axios.get('/js/'+default_lang+'/lang')
  .then(response => {
    Vue.i18n.add(default_lang, response.data);
    Vue.i18n.set(default_lang);
  })
  .catch(error => {
    console.log(error)
  });