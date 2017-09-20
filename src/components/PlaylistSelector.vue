<template>
    <Multiselect placeholder="Select a playlist"
                 v-model="selected"
                 :options="playlists"
                 track-by="uri"
                 label="name">
                 <slot name="noResult">Wat</slot>
    </Multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'playlistselector',
    components: {
        Multiselect,
    },
    data() {
        return {
            selected: {},
            playlists: []
        }
    },
    created() {
        this.$spotify.getUserPlaylists({ limit: 50 })
            .then((response) => {
                this.playlists = response.items;
            })
            .catch((err) => console.error(err))
    },
    watch: {
        selected(value) {
            this.$emit('selectedPlaylistChanged', value);
        }
    }
}
</script>
<style>
@import "~vue-multiselect/dist/vue-multiselect.min.css";
@import "../css/multiselect.css";
</style>
