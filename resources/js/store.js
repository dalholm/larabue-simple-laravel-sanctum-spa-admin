import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

let defaults = {
    layout: 'app-layout'
};

export default new Vuex.Store({
    state: {
        applicationLoading: false,
        isLoading: false,
        layout: 'app-layout', // app-layout || simple-layout
        user: null,
        token: localStorage.getItem('access_token') || null,
        expires: localStorage.getItem('token_expires') || 0,
        expiresTimerRunning: false,
        timerInterval: 60, // Seconds
    },
    mutations: {
        applicationLoading(state, isLoading){
            state.applicationLoading = isLoading;
        },
        loading(state, isLoading) {
            state.isLoading = isLoading;
        },
        set_layout (state, payload) {
            state.layout = payload;
        },
        set_token (state, payload) {
            state.token = payload.token;
            state.expires = payload.expires;
        },
        logout (state) {
            state.token = null;
            state.user = null;
            state.expires = 0;
            state.expiresTimerRunning = false;
        },
        set_user (state, user) {
            state.user = user;
        },
        countdown (state) {
            state.expires -= 1 * state.timerInterval;
        },
        start_timer (state, payload) {
            state.expiresTimerRunning = payload;
        },
    },
    actions: {
        countdown (context) {
            context.commit('countdown');
            localStorage.setItem('token_expires', context.getters.expires);
            if (context.getters.expires <= 0) {
                context.dispatch('logout');
            }
        },
        logout(context) {
            if (context.getters.authToken) {
                return new Promise((resolve, reject) => {
                    axios.post('/api/logout').then((result) => {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('token_expires');
                        context.commit('logout');

                        resolve(result);
                    }).catch((e) => {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('token_expires');
                        context.commit('logout');
                        reject(e);
                    });
                })
            }
        },
        login(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login', payload).then(result => {
                    const token = result.data.access_token;
                    const expires = result.data.expires_in;
                    localStorage.setItem('token_expires', expires);
                    localStorage.setItem('access_token', token);
                    context.commit('set_token', {
                        token: token,
                        expires: expires
                    });

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
                    if (error.response.status === 401) {
                        context.commit('logout');
                    }
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
        token (state) {
            return state.token;
        },
        layout (state) {
            return state.layout;
        },
        user (state) {
            return state.user
        },
        expires (state) {
            return state.expires
        },
        isLoading (state) {
            return state.isLoading
        },
        expiresTimerRunning (state) {
            return state.expiresTimerRunning
        },
        timerInterval (state) {
            return state.timerInterval * 1000;
        },
        expireString (state) {
            let seconds = state.expires;

            let days = Math.floor(seconds / (3600*24));
            seconds  -= days*3600*24;
            let hrs   = Math.floor(seconds / 3600);
            seconds  -= hrs*3600;
            let mnts = Math.floor(seconds / 60);
            seconds  -= mnts*60;

            return days+" days, "+hrs+" Hrs, "+mnts+" Minutes";
        },
    }
})
