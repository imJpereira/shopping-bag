import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    
    loadProducts(state, products) {
        state.products = products;
    },

    loadBag(state, products) {
      state.productsInBag = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    },

    removeFromBag(state, productID) {
      const updatedBag = state.productsInBag.filter(item => productID != item.id);
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    },
  }, 
  actions: {
    
    loadProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products')
      .then(response => {
        commit('loadProducts', response.data);
      })
      .catch(e => console.log(e));
    },

    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")))
      }
    },

    addToBag({ commit }, product) {
      commit('addToBag', product);
    },

    removeFromBag({ commit }, productID) {
      if(confirm('Are you sure you want to remove the item from your bag?')) {
        commit('removeFromBag', productID);
      }
    },
  },
  modules: {
  }
})
