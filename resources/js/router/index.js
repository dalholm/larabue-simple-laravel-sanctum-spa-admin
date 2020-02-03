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

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        store.commit('loading', true);
    }
    next()
})

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    store.commit('loading', false);
    console.log('done in router');

})

export default router;
