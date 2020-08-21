import Vue from 'vue'
import routes from './routes'
import Router from 'vue-router'
import store from '../store';
import { NotificationProgrammatic as Notification } from 'buefy'

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
            try {
                let {data} = await store.dispatch('fetchUser');

                // check if the user has the correct role
                if (to.meta.role) {
                    if (data.has_role[to.meta.role]) {
                        next();
                    } else {
                        Notification.open({
                            message: 'Missing permissions!',
                            type: 'is-danger'
                        })
                        next({
                            path: '/404'
                        })
                    }
                }
                next();
            } catch (e) {
                next({
                    path: '/login'
                })
            }
        } else {
            // check if the user has the correct role
            if (to.meta.role) {
                if (store.getters.user.has_role[to.meta.role]) {
                    next();
                } else {
                    Notification.open({
                        message: 'Missing permissions!',
                        type: 'is-danger'
                    })
                    try {
                        next({
                            path: '/404'
                        })
                    } catch (e) {
                        console.log(e);
                    }

                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
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
