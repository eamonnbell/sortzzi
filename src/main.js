import localforage from 'localforage';
import Vue from 'vue'
import SpotifyWebApi from 'spotify-web-api-js'
import App from './App.vue'
import store from './store'
import router from './router'

var spotify = new SpotifyWebApi();

Object.defineProperty(Vue.prototype, '$spotify', { value: spotify });

localforage.config({
  name: 'sortzzi'
});

window.vm = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});


