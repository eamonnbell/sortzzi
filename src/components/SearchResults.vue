<template>
<div>
    <ul>
        <li v-for="item in items" v-bind:key="item.id">
            {{ item.id }} -- {{ item.name }} -- by {{ item.artists.toString() }} 
        </li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'searchresults',
    props: ['query'],
    data() {
        return {
            items: []
        }
    },
    methods: {
        executeQuery: function(){
            var prom = this.$spotify.searchTracks(this.query, {limit: 5})
                .then(data => {
                    this.items = data.tracks.items;
                    this.$emit('newResultsCount', this.items.length)
                }, err => console.log(err))
        }
    },
    watch: {
        query() {
            this.executeQuery();
        }
    }
}
</script>

<style>

</style>
