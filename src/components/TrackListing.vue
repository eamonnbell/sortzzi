<template>
    <div>
        <!-- <ul>
            <li v-for="track in tracks" v-bind:key="track.id">
                {{ track.track_number }} - {{ track.name }} - {{ Math.floor(track.duration_ms / 1000 / 60) }}'{{ (((track.duration_ms / 1000 / 60) - Math.floor((track.duration_ms / 1000 / 60))) * 60).toFixed(0) }}"

                {{ track.name }}
            </li>
        </ul> -->

        <div v-bind:id="'tree-' + albumId">
        </div>
    </div>
</template>

<script>
import {buildTrieFromTracks} from '../utils/tracks.js'

export default {
    name: 'tracklisting',
    props: ['albumId'],
    data() {
        return {
            tracks: [],
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
    },
    methods: {
        constructJsTree() {
            var trackNames = this.tracks.map(track => track.name);
            var t = buildTrieFromTracks(trackNames);
            window.$(`#tree-${this.albumId}`)
                .jstree({
                    'core':{
                        'data': t
                    }
                });
        }
    },
    created() {
        // fetch tracks from Spotify API
        this.$spotify.getAlbum(this.albumId)
            .then(data => data.tracks.items.map(t => t.id))
            .then(trackIds => this.$spotify.getTracks(trackIds))
            .then(tracksInfo => {
                this.tracks = tracksInfo.tracks;
                this.constructJsTree();
            })
            .catch(err => console.error(err));
    },
}
</script>

<style>

</style>
