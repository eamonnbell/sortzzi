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
                        <input class="input" type="text"
                               ref="query"
                               placeholder="Find music"
                               v-bind:value="query"
                               v-on:keyup.enter="updateQuery($event.target.value)">
                    </p>
                    <p class="control">
                        <button class="button"
                                v-on:click="updateQuery($refs.query.value)">
                            Search
                        </button>
                    </p>
                </div>
            </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
            <p class="level-item">
                <strong>Albums</strong>
            </p>
            <p class="level-item">
                <a class="button is-success">Clear</a>
            </p>
        </div>
    </nav>
    </div>
</template>

<script>
export default {
    name: 'searchcontrol',
    props: ['query', 'resultsCount'],
    methods: {
        updateQuery(query){
            this.$emit('input', query);
        }
    }
}
</script>

<style>

</style>
