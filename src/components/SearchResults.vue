<template>
    <div v-if="query !== ''">
        <div v-if="result.albums.items.length > 0" class="box">
            <h2 class="title">Albums</h2>
            <h2 class="subtitle is-5">About {{ result.albums.total }} results</h2>
            <AlbumResult v-for="item in result.albums.items" v-bind:item="item" v-bind:key="item.id"></AlbumResult>
        </div>

        <div v-if="result.tracks.items.length > 0" class="box">
            <h2 class="title">Tracks</h2>
            <h2 class="subtitle is-5">{{ result.tracks.total }}</h2>
            <TrackResult v-for="item in result.tracks.items" v-bind:item="item" v-bind:key="item.id"></TrackResult>
        </div>

        <div v-if="resultsCount.total == 0" class="box">No results found for <em>{{ query }}</em></div>
    </div>
</template>
<script>
import AlbumResult from './AlbumResult.vue'
import TrackResult from './TrackResult.vue'

export default {
    name: 'searchresults',
    props: {
        query: String,
        searchTypes: {
            type: Array,
            default() {
                return ['album', 'track']
            }
        }
    },
    components: {
        AlbumResult, TrackResult
    },
    data() {
        return {
            result: {
                albums: {
                    items: []
                },
                tracks: {
                    items: []
                }
            }
        }
    },
    methods: {
        executeQuery: function() {
            var prom = this.$spotify.search(this.query, this.searchTypes, {
                limit: 10,
                offset: 10 * (this.searchResultsPage - 1)
            }).then(response => {
                this.result.albums.items = [];
                this.result.tracks.items = [];

                this.result = Object.assign(this.result, response);
                
                this.$store.commit('UPDATE_SEARCH_RESULTS_COUNT', this.result.albums.total);

                this.$emit('newResultsCount', this.resultsCount.total)

            }, err => this.$store.dispatch('notify', {
                message: JSON.parse(err.response).error.message,
                type: 'warning'
            }))
        }
    },
    computed: {
        resultsCount() {
            var resultsByType = {
                'albums': this.result.albums.items.length,
                'tracks': this.result.tracks.items.length,
            };

            var total = Object.values(resultsByType)
                .reduce((a, b) => a + b);

            return Object.assign(resultsByType, { total })
        },
        searchResultsPage(){
            return this.$store.state.searchResultsPage;
        },
    },
    watch: {
        query() {
            if (this.query === '') {
                this.items = [];
                this.$emit('newResultsCount', this.items.length)
            } else {
                this.executeQuery();
            }
        },
        searchResultsPage(){
            this.executeQuery();
        }
    }
}
</script>

<style>

</style>
