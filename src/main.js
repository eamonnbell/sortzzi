import Vue from 'vue'
import SpotifyWebApi from 'spotify-web-api-js'
import App from './App.vue'

var store = {};
Vue.prototype.$store = store;

var spotify = new SpotifyWebApi();
Vue.prototype.$spotify = spotify;

window.vm = new Vue({
  el: '#app',
  render: h => h(App)
});


