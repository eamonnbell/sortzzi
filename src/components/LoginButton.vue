<template>
    <div>
        <!-- learned_that::bulma uses anchor tags for buttons -->
        <a class="button is-primary" v-bind:href="loggedIn ? '#' : loginHref" @click="handleClick">{{ buttonText }}</a>
    </div>
</template>

<script>
import Globals from '../globals'

export default {
    name: 'loginbutton',
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        buttonText: function() {
            if (this.loggedIn) {
                return 'Logout';
            } else {
                return 'Login with Spotify...';
            }
        },
        loginHref: function() {
            const authConfig = {
                client_id: Globals.SPOTIFY_CLIENT_ID,
                response_type: 'token',
                redirect_uri: Globals.REDIRECT_URI,
                scope: ''
            };
            // learned_that::the URLSearchParams API exists
            const params = new URLSearchParams('');

            for (let key in authConfig) {
                params.set(key, authConfig[key]);
            }

            const loginHref = `${Globals.SPOTIFY_AUTH_ENDPOINT}?${params}`

            return loginHref
        }
    },
    methods: {
        handleClick() {
            if(this.loggedIn){
                this.$store.dispatch('logOut');
            }
        }
    },
    // learned_that::props are not bound in vue until created() 
    created() {
        if (!this.loggedIn) {
            function getFromCurrentQueryString(key, delimiter = '#') {
                // learned_that::Spotify auth API returns tokens in a hash fragment
                const currentQueryString = String(window.location).split(delimiter)[1];
                const params = new URLSearchParams(currentQueryString);

                return params.get(key);
            }

            const accessToken = getFromCurrentQueryString('access_token');

            if (accessToken && !this.loggedIn) {
                this.$emit('accessTokenReceived', accessToken);
            }

            // learned_that::HTML5 history API https://stackoverflow.com/a/13824103 
            window.location.replace("#")
            history.replaceState({}, '', window.location.href.slice(0, -1));
        }
    }
}
</script>

<style>
</style>
