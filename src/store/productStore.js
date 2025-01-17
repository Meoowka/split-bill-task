//Исправил название функции, а также исправил if
const productDataToObject = (id, name, price, buyer) => ({id, name, price, buyer, consumers: []})

export default {
    namespaced: true,
    state(){
        return {
            products: [],
        }
    },
    mutations: {
        CLEAR_PRODUCTS(state) {
            state.products = [];
        },
        //поставил проблы
        ADD(state, {name, price, buyer}) {
            state.products.push(productDataToObject(state
                .products[state.products.length - 1]?.id + 1 || 0, name, price, buyer));
        },
        EDIT(state, {id, name, price}){
            const product = state.products.find(p => p.id === id);
            product.name = name || `Product ${id + 1}`;
            product.price = price;
        },
        //Убрал скобочки и поставил проблеы у buyer
        REMOVE(state, id){
            state.products = state.products.filter(c => c.id !== id);
            console.log(id)
        },
        EDIT_BUYER(state, {id, buyer}){
            state.products.find(p => p.id === id).buyer = buyer;
        },
        REMOVE_CONSUMER(state, {id, buyerChange}) {
            state.products.forEach(product => {
                product.consumers = product.consumers.filter(c => c !== id);

                if(product.buyer === id) product.buyer = buyerChange;
            });
        },
        TOGGLE_USERS(state, {id, user}){
            const consumers = state.products.find(p => p.id === id).consumers;

            if(!consumers.includes(user)) {
                consumers.push(user)
            } else {
                consumers.splice(consumers.indexOf(user), 1)
            }
        },
        TOGGLE_ALL_USERS(state, {id, users}){
            const consumers = state.products.find(p => p.id === id).consumers;
            const flag = consumers.length !== users.length;
            consumers.splice(0, consumers.length)

            if(flag) users.forEach(c => consumers.push(c.id));
        },
    },
    actions: {
        addProduct({ commit }, payload) {
            commit('ADD', payload);
        },
        editProduct({ commit }, payload) {
            commit('EDIT', payload);
        },
        removeProduct({ commit }, payload) {
            commit('REMOVE', payload);
        },
        editBuyer({ commit }, payload) {
            commit('EDIT_BUYER', payload);
        },
        toggleUsers({ commit }, payload) {
            commit('TOGGLE_USERS', payload);
        },
        toggleAllUsers({ commit }, payload) {
            commit('TOGGLE_ALL_USERS', payload);
        }
    }
}