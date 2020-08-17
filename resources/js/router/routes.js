import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ForgotPasswordForm from "../pages/auth/ForgotPasswordForm";

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
    }, {
        path: '/forgot',
        name: 'forgot',
        component: ForgotPassword,
        meta: {
            layout: 'simple-layout',
            requiresVisitor: true
        }
    }, {
        path: '/reset-password/:token',
        name: 'reset-password-form',
        component: ForgotPasswordForm,
        meta: {
            layout: 'simple-layout',
            requiresVisitor: true
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
