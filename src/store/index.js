import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    trackCart: [],
    notifications: [],
    searchResultsPage: 1,
    searchResultsCount: 0,
    currentPlayerContext: '',
  },
  mutations: {
    LOGGED_IN(state) {
      state.loggedIn = true;
    },
    LOGGED_OUT(state) {
      state.loggedIn = false;
    },
    ADD_TO_TRACK_CART(state, payload) {
      if (!state.trackCart.includes(payload) && payload != undefined)
        state.trackCart.push(payload);
    },
    REMOVE_FROM_TRACK_CART(state, payload) {
      if (state.trackCart.includes(payload))
        state.trackCart = state.trackCart.filter(item => item != payload);
    },
    ADD_TO_NOTIFICATIONS(state, notification) {
      state.notifications.push(notification);
    },
    REMOVE_FROM_NOTIFICATIONS(state, notificationId) {
      state.notifications = state.notifications.filter(item => item.id != notificationId)
    },
    CLEAR_TRACK_CART(state) {
      state.trackCart = [];
    },
    UPDATE_SEARCH_RESULTS_PAGE(state, payload) {
      state.searchResultsPage = payload;
    },
    UPDATE_SEARCH_RESULTS_COUNT(state, payload) {
      state.searchResultsCount = payload;
    },
    UPDATE_CURRENT_PLAYER_CONTEXT(state, payload){
      state.currentPlayerContext = payload;
    }
  },
  // learned_that::actions recieve a context object exposing same methods on store instance
  actions: {
    logOut(context) {
      localforage.clear()
        .then(() => {
          context.commit('LOGGED_OUT');
        })
        .catch((err) => this.$store.dispatch('notify', {
          message: err.message,
          type: 'warning'
        }));
    },
    notify(context, payload) {
      var notification = Object.assign({ id: nanoid() }, payload);
      console.log(notification);
      context.commit('ADD_TO_NOTIFICATIONS', notification);
    }
  }
})

export default store;