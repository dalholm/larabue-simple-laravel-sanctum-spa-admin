import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false
    },
    mutations: {
        loading(state, isLoading) {
            if (isLoading) {
                state.isLoading = true;
            } else {
                state.isLoading = false;
            }
        },
        toggleLoading(state) {
            state.isLoading = !state.isLoading;
        }
    }
})
