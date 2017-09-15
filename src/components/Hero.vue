<template>
  <section v-bind:class="{ 'is-medium': !loggedIn, 'is-small': loggedIn}"
           class="hero is-primary is-bold box">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Sortzzi
          </h1>
          <h2 class="subtitle">
            Fix classical music on Spotify
          </h2>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name: 'hero',
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn;
      }
    }
}
</script>

<style>

</style>
