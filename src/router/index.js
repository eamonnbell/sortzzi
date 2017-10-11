import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../components/Main.vue';
Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Main', component: Main },
];

/* eslint-disable no-new */
export default new VueRouter({
  routes,
  mode: 'history'
});