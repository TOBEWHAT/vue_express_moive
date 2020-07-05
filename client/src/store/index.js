import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    user: null,
    isUserLogin: false,
    loadingInstance: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if (token) {
        state.isUserLogin = true
      }
    },
    setUser(state, user) {
      state.user = user
    },
    setloadingInstance(state, loadingInstance) {
      state.loadingInstance = loadingInstance
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    setloadingInstance({ commit }, loadingInstance) {
      commit('setloadingInstance', loadingInstance)
    }
  }
})
export default store
