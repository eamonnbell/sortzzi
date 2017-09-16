<template>
    <div class="cart">
        <strong>Track cart</strong>
        <ul>
            <li v-for="track in cartTracks">{{ track.id }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'trackcart'
}
</script>

<style scoped>
.cart {
    background: lightgrey;
}
</style>
