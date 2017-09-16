<template>
    <Multiselect placeholder="Select a playlist" v-model="value" :options="options"></Multiselect>
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
            value: '',
            playlists: []
        }
    },
    computed: {
        options() {
            return this.playlists.map((p => p.name))
        }
    },
    created() {
        this.$spotify.getUserPlaylists({limit: 50})
            .then((response) => {
                this.playlists = response.items;
            })
            .catch((err) => console.error(err))
    }
}
</script>
<style>
@import "~vue-multiselect/dist/vue-multiselect.min.css";
</style>
