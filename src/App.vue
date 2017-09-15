<template>
  <div id="app">

    <Hero></Hero>

    <LoginButton v-if="!loggedIn" v-on:accessTokenReceived="handleAccessToken" v-on:logOutRequest="handleLogOut"></LoginButton>

    <template v-if="loggedIn">
      <SpotifyProfile v-on:logOutRequest="handleLogOut">
        <LoginButton v-on:accessTokenReceived="handleAccessToken" v-on:logOutRequest="handleLogOut"></LoginButton>
      </SpotifyProfile>
      
      <SearchControl v-bind:resultsCount="resultsCount" v-model="query" v-on:searchTypesChanged="updateSearchTypes"></SearchControl>

        <div class="columns">
          <div class="column">
            <SearchResults v-on:newResultsCount="updateResultsCount" v-bind:query="query" v-bind:searchTypes="searchTypes"></SearchResults>
          </div>
        </div>

    </template>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
import localforage from 'localforage';

import Hero from './components/Hero.vue'
import LoginButton from './components/LoginButton.vue'
import SearchControl from './components/SearchControl.vue'
import SearchResults from './components/SearchResults.vue'
import SpotifyProfile from './components/SpotifyProfile.vue'

export default {
  name: 'app',
  components: {
    Hero,
    LoginButton,
    SearchControl,
    SearchResults,
    SpotifyProfile
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
      localforage.clear()
        .then(() => {
          this.$store.commit('LOGGED_OUT');
        })
        .catch((err) => console.error(err));
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
