<template>
    <div class="cart content box">
        <strong>Track cart</strong>
        <a v-on:click="clearCart" href="#">(Clear cart)</a>
        <ul>
            <li v-for="track in tracks" v-bind:key="track.id">{{ track.name }}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'trackcart',
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
