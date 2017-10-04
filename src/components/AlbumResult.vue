<template>
    <div class="box">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img v-bind:src="item.images[1].url">
                </p>
            </figure>
            <div class="media-content">
                <p>
                    <strong>{{ item.name }}</strong> -
                    <a @click="collapsed = !collapsed">
                        <span v-if="collapsed">Show TrackTree</span>
                        <span v-else>Hide TrackTree</span>
                    </a> -
                    <a @click="replaceCurrentPlayerContext">Preview album in Player</a>
                    <br>
                    <div class="tags">
                        <span class="tag" v-for="artistName in artistNames">{{ artistName }}</span>
                    </div>
                </p>
            </div>
        </article>

        <TrackTree v-if="!collapsed" v-bind:albumId="item.id"></TrackTree>

    </div>
</template>

<script>
import TrackTree from './TrackTree.vue'

export default {
    name: 'albumresult',
    props: ['item'],
    data() {
        return {
            collapsed: true
        }
    },
    methods: {
        replaceCurrentPlayerContext() {
            this.$store.commit('UPDATE_CURRENT_PLAYER_CONTEXT', this.item.uri);
        }
    },
    components: {
        TrackTree
    },
    computed: {
        artistNames() {
            var artistNames = this.item.artists.map(artist => artist.name);
            return artistNames
        }
    }
}
</script>
<style>

</style>
