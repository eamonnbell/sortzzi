<template>
  <div id="app">
    <div>

      <div class="notifications">
        <Notification v-for="notification in notifications" v-bind:notification="notification"></Notification>
      </div>

      <Hero>
        <LoginButton class="is-light" v-if="!loggedIn" v-on:accessTokenReceived="handleAccessToken" v-on:logOutRequest="handleLogOut"></LoginButton>
      </Hero>

      <div class="container">
        <template v-if="loggedIn">
          <div class="box">
          <div class="columns">
            <div class="column is-two-thirds">
              <SearchControl v-bind:resultsCount="resultsCount" v-model="query" v-on:searchTypesChanged="updateSearchTypes"></SearchControl>
              <PaginationControl v-if="resultsCount > 0" v-bind:resultsCount="resultsCount"></PaginationControl>
              <SearchResults v-on:newResultsCount="updateResultsCount" v-bind:query="query" v-bind:searchTypes="searchTypes"></SearchResults>
            </div>
            <div class="column is-one-third">
                <SpotifyPlayerControl v-bind:contextURI="currentPlayerContext"></SpotifyPlayerControl>
                <SpotifyProfile v-on:logOutRequest="handleLogOut">
                  <LoginButton v-on:accessTokenReceived="handleAccessToken" v-on:logOutRequest="handleLogOut"></LoginButton>
                </SpotifyProfile>
                <TrackCart></TrackCart>
            </div>
          </div>
          </div>

        </template>
      </div>

      <MainFooter></MainFooter>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage';
import Hero from './Hero.vue'
import LoginButton from './LoginButton.vue'
import MainFooter from './MainFooter.vue'
import Notification from './Notification.vue'
import PaginationControl from './PaginationControl.vue'
import SearchControl from './SearchControl.vue'
import SearchResults from './SearchResults.vue'
import SpotifyPlayerControl from './SpotifyPlayerControl.vue'
import SpotifyProfile from './SpotifyProfile.vue'
import TrackCart from './TrackCart.vue'

export default {
  name: 'main',
  components: {
    Hero,
    LoginButton,
    MainFooter,
    Notification,
    PaginationControl,
    SearchControl,
    SearchResults,
    SpotifyPlayerControl,
    SpotifyProfile,
    TrackCart
  },
  data() {
    return {
      message: 'welcome',
      query: '',
      searchTypes: ['album']
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    notifications() {
      return this.$store.state.notifications;
    },
    resultsCount() {
      return this.$store.state.searchResultsCount;
    },
    currentPlayerContext() {
      return this.$store.state.currentPlayerContext;
    }
  },
  methods: {
    handleAccessToken(accessToken) {
      localforage.setItem('currentAccessToken', accessToken)
        .then((value) => {
          this.$spotify.setAccessToken(accessToken);
          this.$store.commit('LOGGED_IN');
        })
        .catch((err) => this.$store.dispatch('notify', { message: err.message, type: 'warning' }));
    },
    handleLogOut() {
      this.$store.dispatch('logOut');
    },
    updateResultsCount(message) {
      console.log('deprecated');
    },
    updateSearchTypes(message) {
      this.searchTypes = message;
    }
  },
  created() {
    // check localforage for existing access token
    localforage.getItem('currentAccessToken')
      .then((value) => {
        // learned_that::localforage returns null if value doesn't exist but this still counts as success
        if (value !== null) {
          this.$spotify.setAccessToken(value);
          // TODO check if token has expired with a quick API call
          this.$store.commit('LOGGED_IN');
        }
      })
      .catch((err) => {
        this.$store.dispatch('notify', { message: err.message, type: 'warning' });
        this.$store.commit('LOGGED_OUT');
      });
  }
}
</script>

<style>
@import "~bulma/css/bulma.css";
@import "../jstree/themes/proton/style.css";
.notifications {
  width: 35vw;
  right: 0px;
  position: fixed !important;
  z-index: 247365;
}
</style>
