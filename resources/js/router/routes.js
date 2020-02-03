import Dashboard from "../pages/Dashboard";
import Forms from "../pages/Forms";
import Currencies from "../pages/Currencies";

export default () => [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/forms', name: 'forms', component: Forms },
    { path: '/currencies', name: 'currencies', component: Currencies },
]
