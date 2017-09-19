<template>
  <div id="app">
    <div>

    <Hero>
      <LoginButton class="is-light" v-if="!loggedIn" v-on:accessTokenReceived="handleAccessToken" v-on:logOutRequest="handleLogOut"></LoginButton>
    </Hero>


    <div class="container">
    <template v-if="loggedIn">
      <SearchControl v-bind:resultsCount="resultsCount" v-model="query" v-on:searchTypesChanged="updateSearchTypes"></SearchControl>
      
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
    SearchControl,
    SearchResults,
    SpotifyProfile,
    TrackCart
  },
  data() {
    return {
      message: 'welcome',
      query: '',
      searchTypes: ['album'],
      resultsCount: 0,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  methods: {
    handleAccessToken(accessToken) {
      localforage.setItem('currentAccessToken', accessToken)
        .then((value) => {
          this.$spotify.setAccessToken(accessToken);
          this.$store.commit('LOGGED_IN');
        })
        .catch((err) => console.error(err));
    },
    handleLogOut() {
      this.$store.dispatch('logOut');
    },
    updateResultsCount(message) {
      this.resultsCount = Number(message);
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
        console.error(err);
        this.$store.commit('LOGGED_OUT');
      });
  }
}
</script>

<style>
@import "~bulma/css/bulma.css";
@import "./jstree/themes/proton/style.css";
</style>
