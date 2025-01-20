import { createApp } from 'vue'
import '/src/style.scss'
import Notifications from '@kyvg/vue3-notification'
import App from './app/App.vue'
import {appStore} from "./store/Store.js";
import router from "./router/router.js";

createApp(App)
    .use(appStore)
    .use(Notifications)
    .use(router)
    .mount('#app')
