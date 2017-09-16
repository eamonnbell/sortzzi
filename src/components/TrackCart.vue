<template>
    <div class="cart">
        <strong>Track cart</strong>
        <ul>
            <li v-for="track in trackCart">{{ track }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'trackcart',
    computed: {
        trackCart(){
            return this.$store.state.trackCart;
        }
    }
}
</script>

<style scoped>
.cart {
    background: lightgrey;
}
</style>
