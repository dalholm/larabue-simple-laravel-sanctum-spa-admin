import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

let defaults = {
    layout: 'app-layout'
};

export default new Vuex.Store({
    state: {
        isLoading: false,
        layout: 'app-layout', // app-layout || simple-layout
        user: null,
        token: localStorage.getItem('access_token') || null,
    },
    mutations: {
        loading(state, isLoading) {
            state.isLoading = isLoading;
        },
        set_layout (state, payload) {
            state.layout = payload;
        },
        set_token (state, payload) {
            state.token = payload;
        },
        logout (state) {
            state.token = null;
            state.user = null;
        },
        set_user (state, user) {
            state.user = user;
        }
    },
    actions: {
        logout(context) {
            if (context.getters.authToken) {
                return new Promise((resolve, reject) => {
                    axios.post('/api/logout').then((result) => {
                        localStorage.removeItem('access_token');
                        context.commit('logout');

                        resolve(result);
                    }).catch((e) => {
                        localStorage.removeItem('access_token');
                        context.commit('destroy_token');
                        reject(e);
                    });
                })
            }
        },
        login(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login', payload).then(result => {
                    const token = result.data.access_token;

                    localStorage.setItem('access_token', token);
                    context.commit('set_token', token);

                    resolve(result);

                }).catch((e) => {
                    reject(e);
                });
            });
        },
        fetchUser(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get('/api/user').then(responce => {
                    const user = responce.data;
                    context.commit('set_user', user);
                    resolve(responce);
                }).catch(error => {
                    reject(error)
                });

            });
        }
    },
    getters: {
        authCheck (state ) {
            if (state.user) {
                return true;
            }
            return false
        },
        authToken (state) {
            return state.token;
        },
        layout (state) {
            return state.layout;
        },
        user (state) {
            return state.user
        }
    }
})
