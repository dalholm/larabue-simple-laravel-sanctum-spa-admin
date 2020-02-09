import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);



axios.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('access_token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${ token }`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default axios
