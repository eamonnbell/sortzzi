import localforage from 'localforage';
import Vue from 'vue'
import SpotifyWebApi from 'spotify-web-api-js'

import App from './App.vue'

var spotify = new SpotifyWebApi();

Object.definePrototype(Vue.prototype, '$spotify', {value: spotify});

localforage.config({
  name: 'sortzzi'
});

window.vm = new Vue({
  el: '#app',
  render: h => h(App)
});


