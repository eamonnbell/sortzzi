<template>
    <div>
        <JSTree v-on:ChangedJsTree="handleChangedJsTree"
                v-bind:treeData="treeData"></JSTree>
    </div>
</template>

<script>
import JSTree from './JSTree.vue'
import { buildTrieFromTracks } from '../utils/tracks.js'

export default {
    name: 'tracktree',
    props: ['albumId'],
    components: {
        JSTree
    },
    data() {
        return {
            tracks: []
        }
    },
    methods: {
        handleChangedJsTree(e, data) {
            // add newly selected trackIds to cart state
            data.changed.selected.forEach((nodeId) => {
                var trackId = data.instance.get_node(nodeId).original.trackId;
                this.$store.commit('ADD_TO_TRACK_CART', trackId);
            });

            // remove newly deselected trackIds from cart state
            data.changed.deselected.forEach((nodeId) => {
                var trackId = data.instance.get_node(nodeId).original.trackId;
                this.$store.commit('REMOVE_FROM_TRACK_CART', trackId);
            });
        }
    },
    computed: {
        trackArtists() {
            var trackArtists = [];
            this.tracks.forEach((t, i) => {
                t.artists.forEach(a => {
                    if (!trackArtists.includes(a.name))
                        trackArtists.push(a.name)
                });
            });
            return trackArtists;
        },
        treeData() {
            return buildTrieFromTracks(this.tracks);
        }
    },

    mounted() {
        // fetch tracks from Spotify API
        this.$spotify.getAlbum(this.albumId)
            .then(data => data.tracks.items.map(t => t.id))
            .then(trackIds => this.$spotify.getTracks(trackIds))
            .then(tracksInfo => this.tracks = tracksInfo.tracks)
            .catch(err => console.error(err));
    }
}
</script>

<style>

</style>
