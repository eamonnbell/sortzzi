<template>
        <transition name="fade">
        <div v-if="isShown" class="notification" v-bind:class="notificationClass">
            <button class="delete" @click="deleteNotification"></button>
            {{ notification.message }}
        </div>
        </transition>
</template>

<script>
export default {
    name: 'notification',
    props: ['notification'],
    data() {
        return {
            isShown: true
        }
    },
    computed: {
        notificationClass(){
            return this.notification.type ? `is-${this.notification.type}` : ''
        }
    },
    methods: {
        deleteNotification() {
            this.isShown = false;
            this.$store.commit('REMOVE_FROM_NOTIFICATIONS', this.notification.id);
        }
    },
    mounted() {
        setTimeout(this.deleteNotification, 2500);
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.notification {
    position: relative;
}
</style>