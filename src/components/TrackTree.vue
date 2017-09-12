<template>
<div>
    <JSTree v-bind:treeData="treeData"></JSTree>
</div>
</template>

<script>
import JSTree from './JSTree.vue'
import {buildTrieFromTracks} from '../utils/tracks.js'

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
    computed: {
        trackArtists() {
            var trackArtists = [];
            this.tracks.forEach((t, i) => {
                t.artists.forEach(a => {
                    if(!trackArtists.includes(a.name))
                        trackArtists.push(a.name)
                });
            });
            return trackArtists;
        },
        trackNames(){
            return this.tracks.map(track => track.name);
        },
        treeData(){
            return buildTrieFromTracks(this.trackNames);
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
