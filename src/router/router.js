import {createRouter, createWebHistory} from "vue-router";
import mainPages from "../pages/mainPages/mainPages.vue";
import userPages from "../pages/userPages/userPages.vue";
import productPages from "../pages/productPages/productPages.vue";
import resultBill from "../pages/resultBill/resultBill.vue";

const routes = [
    {
        path: '/',
        component: mainPages
    },
    {
        path: '/users',
        component: userPages
    },
    {
        path: '/products',
        component: productPages
    },
    {
        path: '/bill',
        component: resultBill
    }

]


const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router;