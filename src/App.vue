<template>
  <div id="app">
    <LoginButton v-if="!loggedIn" v-on:accessTokenReceived="handleAccessToken" v-bind:loggedIn="loggedIn"></LoginButton>
    <SpotifyProfile v-if="loggedIn"></SpotifyProfile>
  </div>
</template>

<script>
import LoginButton from './components/LoginButton.vue'
import SpotifyProfile from './components/SpotifyProfile.vue'

export default {
  name: 'app',
  components: {
    LoginButton, SpotifyProfile
  },
  data () {
    return {
      message: 'welcome',
      loggedIn: false,
    }
  },
  methods: {
    handleAccessToken (accessToken) {
      this.$store.currentAccessToken = accessToken;
      this.$spotify.setAccessToken(this.$store.currentAccessToken);
      this.loggedIn = true;
    }
  }
}
</script>

<style>
</style>
