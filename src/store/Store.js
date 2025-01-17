import { Store } from 'vuex';
import userStore from './userStore.js';
import productStore from './productStore.js';

export const appStore = new Store({
    modules: {
        userStore,
        productStore
    },
    actions: {
        clearAllData({ commit }) {
            commit('userStore/CLEAR_USERS', null, { root: true });
            commit('productStore/CLEAR_PRODUCTS', null, { root: true });
        }
    }
});