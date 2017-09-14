<template>
<div v-if="query !== ''" class="container">

    <div v-if="result.albums.items.length > 0" class="box">
    <h2 class="title">Albums</h2>
    <h2 class="subtitle is-5">{{ resultsCount.albums }}</h2>
    <AlbumResult v-for="item in result.albums.items" v-bind:item="item" v-bind:key="item.id"></AlbumResult>
    </div>
    
    <div v-if="result.tracks.items.length > 0" class="box">
    <h2 class="title">Tracks</h2>
    <h2 class="subtitle is-5">{{ resultsCount.tracks }}</h2>
    <TrackResult v-for="item in result.tracks.items" v-bind:item="item" v-bind:key="item.id"></TrackResult>
    </div>
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
            default(){
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
            var prom = this.$spotify.search(this.query, this.searchTypes, { limit: 10 })
                .then(response => {
                    this.result.albums.items = [];
                    this.result.tracks.items = [];
                    
                    this.result = Object.assign(this.result, response);
                    this.$emit('newResultsCount', this.resultsCount.total)
                }, err => console.log(err))
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

            return Object.assign(resultsByType, {total})
        }
    },
    watch: {
        query() {
            if (this.query === '') {
                this.items = [];
                this.$emit('newResultsCount', this.items.length)
            } else {
                this.executeQuery();
            }
        }
    }
}
</script>

<style>
</style>
