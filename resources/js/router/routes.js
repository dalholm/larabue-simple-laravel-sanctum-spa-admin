import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ProfileSettings from "../pages/profile/Settings";

import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Register from "../pages/auth/Register";

import PageNotFound from "../pages/PageNotFound";


export default () => [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }, {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true },
    }, {
        path: '/profile/settings',
        name: 'profile_settings',
        component: ProfileSettings,
        meta: { requiresAuth: true },
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            layout: 'simple-layout'
        }
    }, {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: { requiresAuth: true }
    }, {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            layout: 'simple-layout'
        }
    },
    // 404 page
    {
        path: "*",
        name: "404",
        component: PageNotFound,
        meta: {
            layout: 'simple-layout'
        }
    }
]
