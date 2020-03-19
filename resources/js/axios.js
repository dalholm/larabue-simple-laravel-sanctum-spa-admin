import Vue from 'vue';
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);


axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    (config) => {
        store.commit('appLoading', true);
        let token = localStorage.getItem('access_token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${ token }`;
        }

        return config;
    },

    (error) => {
        store.commit('appLoading', false);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.commit('appLoading', false);
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.commit('appLoading', false);

    if (error.response.status === 401) {
        store.dispatch('logout');
    }
    return Promise.reject(error);
  });

export default axios
