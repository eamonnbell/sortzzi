<template>
    <div class="card spotify_profile">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4"><strong>{{ me.display_name }}</strong></p>
                    <p class="subtitle is-6">{{ me.id }}</p>
                </div>
            </div>
            <div class="content">
                {{ me.id }} has {{ me.followers.total }} follower(s) on Spotify<br>
            </div>  

            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'spotifyprofile',
    props: ['loggedIn'],
    data() {
        return {
            me: {}
        }
    },
    created() {
        this.$spotify.getMe()
            .then(data => {
                this.me = data;
            }, function(error) {
                console.error(error);
            });
    }
}
</script>

<style scoped>
.spotify_profile {
    position: absolute;
    right: 0px;
    top: 0px;
}
</style>
