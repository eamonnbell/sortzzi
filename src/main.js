import localforage from 'localforage';
import Vue from 'vue'
import Vuex from 'vuex'
import SpotifyWebApi from 'spotify-web-api-js'

import App from './App.vue'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedIn: false
  }
});

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


