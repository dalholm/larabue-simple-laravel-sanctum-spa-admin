import Vue from 'vue'
import routes from './routes'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router);

const router = new Router({
    routes: routes(),
    mode: 'history',
    linkExactActiveClass: 'is-active',
});


router.beforeEach(async (to, from, next) => {

    // Start the route progress bar.
    store.commit('loading', true);

    // default layout declared
    let layout = 'app-layout';

    // look for changes in the layout
    if (to.meta.layout) {
        layout = to.meta.layout;
    }

    if (store.getters.layout != layout) {
        store.commit('set_layout', layout);
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in

        if (!store.getters.authCheck && store.getters.authToken) {
            try {
                await store.dispatch('fetchUser')
            } catch (e) { }
        }

        // if not, redirect to login page.
        if (!store.getters.authToken) {
            next({
                path: '/login'
            })
        }
    }
    next()
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    store.commit('loading', false);
});

export default router;
