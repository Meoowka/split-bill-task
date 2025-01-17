//Исправил название функции
const userDataToObject = (id, name) => ({id, name})

export default {
    namespaced: true,
    state() {
        return {
            user: [],
        }
    },
    getters: {
        getFirstUserID: state => () => state.user[0]?.id || 0
    },
    //Исправил скобочки
    mutations: {
        CLEAR_USERS(state) {
            state.user = [];
        },
        ADD(state, {name}) {
            state.user.push(userDataToObject(state.user[state.user.length-1]?.id + 1 || 0, name));
        },
        EDIT(state, {id, name}) {
            state.user.find(c => c.id === id).name = name || `User ${id + 1}`;
        },
        REMOVE(state, id) {
            state.user = state.user.filter(c => c.id !== id);
        }
    },
    actions: {
        addUser({ commit }, payload) {
            commit('ADD', payload);
        },
        editUser({ commit }, payload) {
            commit('EDIT', payload);
        },
        removeUser({ commit, getters }, payload) {
            commit('REMOVE', payload);
            commit('productStore/REMOVE_CONSUMER', { ...payload, buyerChange: getters.getFirstUserID() }, { root: true });
        },
    }
}