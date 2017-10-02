<template>
<div class="box">
  <nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous" v-bind:disabled="selected <= 1" @click="previousPage" >Previous</a>
  <a class="pagination-next" v-bind:disabled="selected >= pages" @click="nextPage">Next page</a>
  <ul class="pagination-list">
    <li v-for="pageNumber in pagesToShow">
      <a v-if="pageNumber !== '...'" class="pagination-link"
         v-bind:class="{'is-current': pageNumber === selected }"
         @click="selected = pageNumber">{{ pageNumber }}</a>
      <span v-else class="pagination-ellipsis">&hellip;</span>
    </li>
  </ul>
</nav>
</div>
</template>

<script>
import { pagination } from '../utils/pagination'

export default {
    name: 'paginationcontrol',
    props: ['resultsCount'],
    data() {
        return {
            selected: this.$store.state.searchResultsPage
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.resultsCount / 10);
        },
        pagesToShow(){
            return pagination(this.selected, this.pages);
        },  
        atFirstPage() {
            return this.selected <= 1;
        },
        atLastPage(){
            return this.selected >= this.pages;
        },
    },
    methods: {
        nextPage() {
            if (!this.atLastPage) {
                this.selected += 1;
            }
        },
        previousPage(){
            if(!this.atFirstPage) {
                this.selected -= 1;
            }
        }
    },
    watch: {
        selected(value) {
            this.$store.commit('UPDATE_SEARCH_RESULTS_PAGE', value);
        }
    }
}
</script>

<style>

</style>
