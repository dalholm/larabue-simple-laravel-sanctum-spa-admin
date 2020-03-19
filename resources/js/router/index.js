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
        if (!store.getters.isLoggedIn || store.getters.user == null) {
            store.dispatch('fetchUser').then(response => {
                next();
            }).catch(error => {
                next({
                    path: '/login'
                })
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.isLoggedIn) {
            next({
                path: '/'
            })
        }
    }
    next()
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
});

export default router;
