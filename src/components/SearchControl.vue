<template>
    <!-- Main container -->
    <div class="container box">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5">
                        <strong>{{ resultsCount }}</strong> results
                    </p>
                </div>
                <div class="level-item">
                    <div class="field has-addons">
                        <p class="control">
                            <input class="input" type="text" ref="query" placeholder="Find music" v-bind:value="query" v-on:keyup.enter="updateQuery($event.target.value)">
                        </p>
                        <p class="control">
                            <button class="button" v-on:click="updateQuery($refs.query.value)">
                                Search
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <!-- Right side -->
            <div class="level-right">
                <div class="level-item">
                        <div class="control">
                            <div class="select">
                                <select v-model="searchTypes">
                                    <option value="0">Album</option>
                                    <option value="1" disabled>Track (Coming soon...)</option>
                                    <option value="2" disabled>All (Coming soon...)</option>
                                </select>
                            </div>
                        </div>
                </div>
                <div class="level-item">
                    <a class="button is-success" v-on:click="updateQuery('')">Clear</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'searchcontrol',
    props: ['query', 'resultsCount'],
    data() {
        return {
            searchTypes: 0
        }
    },
    methods: {
        updateQuery(query) {
            this.$emit('input', query);
        }
    },
    watch: {
        searchTypes(value){
            var valueSelector = Number(value);
            var searchTypesMap = {
                0: ['album'],
                1: ['track'],
                2: ['album', 'track']
            }
            this.$emit('searchTypesChanged', searchTypesMap[valueSelector]);
        }
    }
}
</script>

<style>

</style>
