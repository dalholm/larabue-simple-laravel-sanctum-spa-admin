import { NotificationProgrammatic as Notification } from 'buefy'
import formfield from "../components/formfield";

export default {
    install: (Vue) => {
        // form field component
        Vue.component('form-field', formfield);

        // Notifications
        Vue.prototype.$successNotification = msg => {
            Notification.open({
                message: msg,
                type: 'is-success',
            })
        }
        Vue.prototype.$errorNotification = msg => {
            Notification.open({
                message: msg,
                type: 'is-danger',
            })
        }
    },
}
