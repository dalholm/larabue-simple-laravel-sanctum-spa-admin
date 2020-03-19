import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

let defaults = {
    layout: 'app-layout'
};

export default new Vuex.Store({
    state: {
        appLoading: 0,
        layout: 'app-layout', // app-layout || simple-layout
        user: null,
        logged_in: localStorage.getItem('logged_in') || false,
    },
    mutations: {
        appLoading(state, isLoading){
            if (isLoading) {
                state.appLoading += 1;
            } else {
                state.appLoading -= 1;
            }
        },
        set_layout (state, payload) {
            state.layout = payload;
        },
        set_token (state, payload) {
            state.token = payload.token;
            state.expires = payload.expires;
            state.expiresDate = payload.expiresDate;
        },
        login (state) {
            state.logged_in = true;
        },
        logout (state) {
            state.logged_in = false;
            state.user = null;
        },
        set_user (state, user) {
            state.user = user;
        }
    },
    actions: {
        logout(context) {
            if (context.state.logged_in) {
                return new Promise((resolve, reject) => {
                    axios.post('/api/logout').then((result) => {
                        localStorage.removeItem('logged_in');
                        context.commit('logout');
                        router.push({name: 'login'})
                        resolve(result);
                    }).catch((e) => {
                        localStorage.removeItem('logged_in');
                        context.commit('logout');
                        reject(e);
                    });
                })
            }
        },
        login(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get('/airlock/csrf-cookie').then(response => {
                    axios.post('/api/login', payload).then(result => {
                        localStorage.setItem('logged_in', true);
                        context.commit('login');

                        resolve(result);

                    }).catch((e) => {
                        reject(e);
                    });
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
                    if (error.response.status === 401) {
                        context.commit('logout');
                    }
                    reject(error)
                });

            });
        }
    },
    getters: {
        isLoggedIn (state) {
            return state.logged_in;
        },
        layout (state) {
            return state.layout;
        },
        user (state) {
            return state.user
        },

        loading(state) {
            return state.appLoading;
        },
    }
})
