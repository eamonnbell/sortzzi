import localforage from 'localforage';
import Vue from 'vue'
import Vuex from 'vuex'
import SpotifyWebApi from 'spotify-web-api-js'

import App from './App.vue'

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    LOGGED_IN (state) {
      state.loggedIn = true;
    },
    LOGGED_OUT (state) {
      state.loggedIn = false;
    }
  },
  // learned_that::actions recieve a context object exposing same methods on store instance
  actions: {
    logOut(context) {
      localforage.clear()
      .then(() => {
        context.commit('LOGGED_OUT');
      })
      .catch((err) => console.error(err));
    }
  }
})

var spotify = new SpotifyWebApi();

Object.defineProperty(Vue.prototype, '$spotify', {value: spotify});

localforage.config({
  name: 'sortzzi'
});

window.vm = new Vue({
  el: '#app',
  store,
  render: h => h(App)
});


