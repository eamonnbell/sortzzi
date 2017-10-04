<template>
    <div class="box">
        <h2 class="title">Player</h2>
        <div class="content">
            <strong>{{ myCurrentPlayingInfo.item.album.name }}</strong><br>          
            {{ myCurrentPlayingInfo.item.name }}
            <div class="tags">
                <span class="tag" v-for="artist in myCurrentPlayingInfo.item.artists" v-bind:key="artist.id">{{ artist.name }}</span>
            </div>
        </div>
        <div class="level">
            <a class="button" @click="skipToPrevious">⏮</a>
            <a class="button" @click="play">▶️</a>
            <a class="button" @click="pause">⏸</a>
            <a class="button" @click="skipToNext">⏭</a>
        </div>
        <progress class="progress" v-bind:value="myCurrentPlayingInfo.progress_ms" v-bind:max="myCurrentPlayingInfo.item.duration_ms"></progress>
        <div class="field">
            <label class="label">Device to control</label>
            <div class="control">
                <div class="select">
                    <select v-model="selectedDeviceId">
                        <option v-for="(device, index) in devices"
                                v-bind:value="device.id"
                                v-bind:key="device.id">
                        {{ device.name }} ({{ device.type}})
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'spotify-player-control',
    props: ['contextURI'],
    data() {
        return {
            devices: [],
            selectedDeviceId: '',
            myCurrentPlayingInfo: {}
        }
    },
    computed: {
        apiOptions() {
            return {
                'device_id': this.selectedDeviceId
            }
        }
    },
    methods: {
        skipToPrevious() {
            this.$spotify.skipToPrevious(this.apiOptions)
                .then((r) => console.log(r))
                .catch((err) => console.error(err));
        },
        play() {
            this.$spotify.play(Object.assign(this.apiOptions, {
                context_uri: this.contextURI
            }))
                .then((r) => console.log(r))
                .catch((err) => console.error(err));
        },
        pause() {
            this.$spotify.pause(this.apiOptions)
                .then((r) => console.log(r))
                .catch((err) => console.error(err));
        },
        skipToNext() {
            this.$spotify.skipToNext(this.apiOptions)
                .then((r) => console.log(r))
                .catch((err) => console.error(err));
        },
        getMyCurrentPlayingInfo() {
            this.$spotify.getMyCurrentPlayingTrack(this.apiOptions)
                .then((r) => this.myCurrentPlayingInfo = r)
                .catch((err) => console.error(err));
        }
    },
    created() {
        this.getMyCurrentPlayingInfo();
        setInterval(this.getMyCurrentPlayingInfo, 2500);
        this.$spotify.getMyDevices()
            .then((r) => this.devices = r.devices)
            .catch((err) => console.error(err));
    },
    watch: {
        contextURI(){
            this.play();
        }
    }
}
</script>

<style>

</style>
