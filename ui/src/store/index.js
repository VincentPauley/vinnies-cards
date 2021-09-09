import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'Party'
  },
  getters: {
    mode: state => state.mode
  },
  mutations: {
    setMode(state, payload) {
      state.mode = payload;
    }
  },
  actions: {},
  modules: {}
});
