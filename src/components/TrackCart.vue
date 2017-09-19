<template>
    <div class="box">
        <h2 class="title">Track Cart</h2>
        <div class="content">
            <strong>Tracks to add...</strong>
            <a v-on:click="clearCart" href="#">(Clear cart)</a>
            <ul>
                <li v-for="track in tracks" v-bind:key="track.id">{{ track.name }}</li>
            </ul>
        </div>
        <div class="field has-addons">
          <div class="control">
            <a @click="addTracksToTargetPlaylist" class="button">Add to</a>
          </div>
            <PlaylistSelector v-on:selectedPlaylistChanged="handleSelectedPlaylistChanged"></PlaylistSelector>
          </div>
        </div>
    </div>
</template>
<script>
import PlaylistSelector from './PlaylistSelector.vue'

export default {
    name: 'trackcart',
    components: {
        PlaylistSelector
    },
    data() {
        return {
            tracks: [],
            cartTargetPlaylist: '',
        }
    },
    computed: {
        trackCart() {
            return this.$store.state.trackCart;
        },
    },
    methods: {
        clearCart() {
            this.$store.commit('CLEAR_TRACK_CART');
        },
        handleSelectedPlaylistChanged(value) {
            this.cartTargetPlaylist = value;
        },
        addTracksToTargetPlaylist(){
            var targetPlaylistURI = this.cartTargetPlaylist.uri;
            // TODO de-brittle
            var match = targetPlaylistURI.match(/spotify:user:(.*):playlist:(.*)/);
            var userId = match[1];
            var playlistId = match[2];
            var trackURIs = this.tracks.map((t) => t.uri);
            this.$spotify.addTracksToPlaylist(userId, playlistId, trackURIs)
                .then((response) => {
                    // TODO notify user
                    this.$store.commit('CLEAR_TRACK_CART');
                })
                .catch((err) => console.error(err));
        },
    },
    watch: {
        trackCart: function(value) {
            if (value.length == 0) {
                this.tracks = [];
            } else {
                this.$spotify.getTracks(value)
                    .then((response) => {
                        this.tracks = response.tracks;
                    })
                    .catch((err) => console.error(err));
            }

        }
    }
}
</script>

<style>
</style>
