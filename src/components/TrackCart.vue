<template>
    <div v-if="trackCart.length !== 0">
        <div class="cart content box">
            <strong>Track cart</strong>
            <a v-on:click="clearCart" href="#">(Clear cart)</a>
            <ul>
                <li v-for="track in tracks" v-bind:key="track.id">{{ track.name }}</li>
            </ul>
        </div>
        <div class="field has-addons">
          <div class="control">
            <a class="button">Add to</a>
          </div>
          <div class>
            <PlaylistSelector></PlaylistSelector>
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
            tracks: []
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
        }
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

<style scoped>
.cart {
    margin: 1rem;
}
</style>
