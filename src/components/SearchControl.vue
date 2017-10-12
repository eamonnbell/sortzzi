<template>
    <!-- Main container -->
    <div class="box">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <div class="field has-addons">
                        <p class="control">
                            <input class="input" style="width:25vw;" type="text" ref="query" placeholder="Find music" v-model="query" v-on:keyup.enter="updateQuery($event.target.value)">
                        </p>
                        <p class="control">
                            <button class="button" v-on:click="updateQuery($refs.query.value)">
                                Search
                            </button>
                        </p>
                    </div>
                </div>
                <div v-if="embiggenedQuery" class="level-item">
                    <a @click="useEmbiggenedQuery">Click here to expand your search</a>
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
            </div>
        </nav>
    </div>
</template>

<script>
import { embiggen } from '../utils/embiggenator'

export default {
    name: 'searchcontrol',
    props: ['resultsCount'],
    data() {
        return {
            searchTypes: 0,
            query: '',
            queryIsEmbiggened: false
        }
    },
    computed: {
        embiggenedQuery() {
            if (this.query && !this.queryIsEmbiggened) {
                return embiggen(this.query);
            }
        } 
    },
    methods: {
        useEmbiggenedQuery(){
            this.queryEmbiggened = true;
            this.query = this.embiggenedQuery;
        },
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
