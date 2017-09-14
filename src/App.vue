<template>
  <div id="app">

    <Hero></Hero>

    <LoginButton v-if="!loggedIn" v-on:accessTokenReceived="handleAccessToken" v-on:logOutRequest="handleLogOut" v-bind:loggedIn="loggedIn"></LoginButton>

    <template v-if="loggedIn">
      <SpotifyProfile v-on:logOutRequest="handleLogOut" v-bind:loggedIn="loggedIn">
        <LoginButton v-on:accessTokenReceived="handleAccessToken" v-on:logOutRequest="handleLogOut" v-bind:loggedIn="loggedIn"></LoginButton>
      </SpotifyProfile>
      <SearchControl v-bind:resultsCount="resultsCount" v-model="query" v-on:searchTypesChanged="updateSearchTypes"></SearchControl>

        <div class="columns">
          <div class="column">
            <SearchResults v-on:newResultsCount="updateResultsCount" v-bind:query="query" v-bind:searchTypes="searchTypes"></SearchResults>
          </div>
        </div>

    </template>

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
      loggedIn: false,
      query: '',
      searchTypes: ['album', 'track'],
      resultsCount: 0,
    }
  },
  methods: {
    handleAccessToken(accessToken) {
      localforage.setItem('currentAccessToken', accessToken)
        .then((value) => {
          console.log('setting currentAccessToken');
          this.$spotify.setAccessToken(accessToken);
          this.loggedIn = true;
        })
        .catch((err) => console.err(err));
    },
    handleLogOut() {
      console.log('handleLogOut called');
      localforage.clear()
        .then(() => {
          console.log('localforage cleared');
          this.loggedIn = false;
        })
        .catch((err) => console.err(err));
    },
    updateResultsCount(message) {
      this.resultsCount = Number(message);
    },
    updateSearchTypes(message) {
      console.log('updateSearchtypes');
      console.log(message);
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
          this.loggedIn = true;
        }
      })
      .catch((err) => {
        console.log('cant find currentAccessToken in localforage');
        console.error(err);
        this.loggedIn = false;
      });
  }
}
</script>

<style>
@import "~bulma/css/bulma.css";
@import "./jstree/themes/proton/style.css";
</style>
