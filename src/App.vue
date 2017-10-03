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
      <SearchControl v-bind:resultsCount="resultsCount" v-model="query" v-on:searchTypesChanged="updateSearchTypes"></SearchControl>
      
      <PaginationControl v-if="resultsCount > 0" v-bind:resultsCount="resultsCount"></PaginationControl>

      <div class="columns">
        <div class="column is-two-thirds">
          <SearchResults v-on:newResultsCount="updateResultsCount" v-bind:query="query" v-bind:searchTypes="searchTypes"></SearchResults>
        </div>
        <div class="column is-one-third">
          <div class="box">
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

import Hero from './components/Hero.vue'
import LoginButton from './components/LoginButton.vue'
import MainFooter from './components/MainFooter.vue'
import Notification from './components/Notification.vue'
import PaginationControl from './components/PaginationControl.vue'
import SearchControl from './components/SearchControl.vue'
import SearchResults from './components/SearchResults.vue'
import SpotifyProfile from './components/SpotifyProfile.vue'
import TrackCart from './components/TrackCart.vue'

export default {
  name: 'app',
  components: {
    Hero,
    LoginButton,
    MainFooter,
    Notification,
    PaginationControl,
    SearchControl,
    SearchResults,
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
    }
  },
  methods: {
    handleAccessToken(accessToken) {
      localforage.setItem('currentAccessToken', accessToken)
        .then((value) => {
          this.$spotify.setAccessToken(accessToken);
          this.$store.commit('LOGGED_IN');
        })
        .catch((err) => this.$store.dispatch('notify', {message: err.message, type: 'warning'}));
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
        this.$store.dispatch('notify', {message: err.message, type: 'warning'});
        this.$store.commit('LOGGED_OUT');
      });
  }
}
</script>

<style>
@import "~bulma/css/bulma.css";
@import "./jstree/themes/proton/style.css";
.notifications {
    width: 35vw;
    right: 0px;
    position: fixed !important;
    z-index: 247365
}
</style>
