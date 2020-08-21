import Settings from "../pages/Settings";
import Roles from "../pages/settings/Roles";
import Users from "../pages/settings/Users";

export default () => {
    return [
        // Users
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            redirect: { name: 'users' },
            meta: {
                requiresAuth: true,
                role: 'admin'
            },
            children: [
                {
                    path: 'users',
                    name: 'users',
                    component: Users,
                    meta: {
                        role: 'admin'
                    },
                },{
                    path: 'roles',
                    name: 'roles',
                    component: Roles,
                    meta: {
                        role: 'admin'
                    },
                },
            ]
        },
    ]
}
