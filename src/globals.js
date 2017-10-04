var globals = {
    // learned_that::redirect uris must be set at spotify dev console
    'development': {
        SPOTIFY_AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
        SPOTIFY_CLIENT_ID: '8cb840d28d554d4cb83e82213d283945',
        REDIRECT_URI: 'http://localhost:8080/',
        SPOTIFY_REQUESTED_SCOPE: 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state'
    },
    'production': {
        SPOTIFY_AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
        SPOTIFY_CLIENT_ID: '8cb840d28d554d4cb83e82213d283945',
        REDIRECT_URI: 'http://www.sortzzi.xyz',
        SPOTIFY_REQUESTED_SCOPE: 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state'
    }
};

export default globals[process.env.NODE_ENV]
