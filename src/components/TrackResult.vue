<template>
    <article class="media">
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ item.name }}</strong>
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
    name: 'trackresult',
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
