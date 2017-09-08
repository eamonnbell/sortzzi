<template>
  <div id="app">
    
    <Hero></Hero>

    <template v-if="loggedIn">
      <SpotifyProfile></SpotifyProfile>
      <SearchControl v-model="query"></SearchControl>
      <SearchResults v-bind:query="query"></SearchResults>
    </template>

    <LoginButton v-if="!loggedIn" v-on:accessTokenReceived="handleAccessToken" v-bind:loggedIn="loggedIn"></LoginButton>
  </div>
</template>

<script>

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
      query: 'Placeholder query',
    }
  },
  methods: {
    handleAccessToken(accessToken) {
      this.$store.currentAccessToken = accessToken;
      this.$spotify.setAccessToken(this.$store.currentAccessToken);
      this.loggedIn = true;
    }
  }
}
</script>

<style>

</style>
