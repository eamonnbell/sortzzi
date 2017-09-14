<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img v-bind:src="item.images[1].url">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ item.name }}</strong>
                    <br>
                    <div class="tags">
                        <span class="tag" v-for="artistName in artistNames">{{ artistName }}</span>
                    </div>
                </p>
            </div>
        </div>
    </article>
</template>

<script>

export default {
    name: 'albumresult',
    props: ['item'],
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
