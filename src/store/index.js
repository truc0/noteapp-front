import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    fetchToken(state) {
      const token = localStorage.getItem('token')
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
