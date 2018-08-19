// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  products from './store'
import * as types from './mutation-stype'
const state = {
  all: []
 
  
}
const mutations = {
  RECEIVE_PRODUCTS (state, products) {
    state.all = products
  }
  
} 
const getters = {
  allProducts: function(state){ return state.all },
  getapi:function(state){ return state.api }
}

const actions = {
  resetProducts ({ commit},load ) {
    var resetproduct
    resetproduct=products.getProducts(load.cd,load.fd)
      commit("RECEIVE_PRODUCTS", resetproduct)
   
  },
  
getAllProducts ({ commit }) {
  var resetproduct
    resetproduct=products.getAllProducts()
    
     commit("RECEIVE_PRODUCTS", resetproduct )
     
}
 } 
export default {
  state,
  getters,
  actions,
 mutations
} 