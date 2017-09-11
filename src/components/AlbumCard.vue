<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image">
                        <img v-bind:src="item.images[2].url" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{{ item.name }}</p>
                    <p class="subtitle">
                        <span class="tag" v-for="artistName in artistNames">{{ artistName }}</span>
                    </p>
                </div>
            </div>

            <div class="control">
            <label class="radio">
                <input type="radio" value="trackListing" v-model="trackViewType">
                Tracklist View
            </label>
            <label class="radio">
                <input type="radio" value="trackTree" v-model="trackViewType">
                TrackTree View
            </label>
            </div>

            <div class="content">
                <TrackListing v-if="trackViewType == 'trackListing'" v-bind:albumId="item.id"></TrackListing>
                <TrackTree v-else-if="trackViewType == 'trackTree'" v-bind:albumId="item.id"></TrackTree>
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" :href="item.external_urls.spotify">Play album</a>
            <a class="card-footer-item">Like</a>
            <a class="card-footer-item">Hate</a>
        </footer>
    </div>
</template>

<script>
import TrackListing from './TrackListing.vue'
import TrackTree from './TrackTree.vue'

export default {
    name: 'albumcard',
    props: ['item'],
    data() {
        return {
            trackViewType: 'trackListing'
        }
    },
    components: {
        TrackListing, TrackTree
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
