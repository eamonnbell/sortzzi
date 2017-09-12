var globals = {
    // learned_that::redirect uris must be set at spotify dev console
    'development': {
        SPOTIFY_AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
        SPOTIFY_API_ENDPOINT: 'https://api.spotify.com/v1/me',
        SPOTIFY_CLIENT_ID: '8cb840d28d554d4cb83e82213d283945',
        REDIRECT_URI: 'http://localhost:8080/'
    },
    'production': {
        SPOTIFY_AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
        SPOTIFY_API_ENDPOINT: 'https://api.spotify.com/v1/me',
        SPOTIFY_CLIENT_ID: '8cb840d28d554d4cb83e82213d283945',
        REDIRECT_URI: 'http://sortzzi.io'
    }
};

export default globals.get[process.env.NODE_ENV]
