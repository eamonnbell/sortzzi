<template>
    <div class="box spotify_profile">
        <h2 class="title">Profile</h2>
        <div class="content">
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
    data() {
        return {
            me: {
                followers: {
                    total: 0
                }
            }
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

<style>
</style>
