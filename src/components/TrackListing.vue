<template>
    <div>
        {{ albumId }}
        <ul>
            <li v-for="track in tracks" v-bind:key="track.id">
                {{ track.track_number }} - {{ track.name }} - {{ Math.floor(track.duration_ms / 1000 / 60) }}'{{ (((track.duration_ms / 1000 / 60) - Math.floor((track.duration_ms / 1000 / 60))) * 60).toFixed(0) }}"
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'tracklisting',
    props: ['albumId'],
    data() {
        return {
            tracks: [
                'this',
                'that',
                'the other'
            ]
        }
    },
    created() {
        // fetch tracks from Spotify API
        console.log('getting stuff for ', this.albumId);
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
