import { createApp } from 'vue'
import '/src/style.scss'
import App from './app/App.vue'
import {appStore} from "./store/Store.js";
import router from "./router/router.js";

createApp(App)
    .use(appStore)
    .use(router)
    .mount('#app')
