<template>
<div class="cards">
    <AlbumCard v-for="item in items"
               v-bind:item="item"
               v-bind:key="item.id"></AlbumCard>
</div>
</template>
<script>
import AlbumCard from './AlbumCard.vue'

export default {
    name: 'searchresults',
    props: ['query'],
    components: {
        AlbumCard
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        executeQuery: function(){
            var prom = this.$spotify.searchAlbums(this.query, {limit: 10})
                .then(data => {
                    this.items = data.albums.items;
                    this.$emit('newResultsCount', this.items.length)
                }, err => console.log(err))
        }
    },
    watch: {
        query() {
            if(this.query === '') {
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
