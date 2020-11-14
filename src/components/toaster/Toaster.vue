<template>
    <div id="toaster" v-if="!!toaster">
        <div :class="`toast_message toast_${message.type}`" class="toast_message" v-for="(message, idx) in toaster.messages" :key="idx">
            <p class="toast_content">{{ $t(`errors.${message.value}`) }}</p>
            <v-btn icon class="toast_close" @click="close(message.id)">
                <v-icon>fa-times</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Toaster',
    data () {
        return {
            toaster: null
        }
    },
    beforeMount () {
        this.toaster = this.$toaster
    },
    methods: {
        close (id) {
            this.toaster.remove(id)
        }
    }
}
</script>

<style lang="scss" scoped>
#toaster {
    display: flex;
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    pointer-events: none;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
}
.toast_message {
    color: $toaster-default-color;
    background-color: $toaster-default-bg-color;
    min-height: 45px;
    width: 100%;
    max-width: 380px;
    border-radius: 5px;
    margin: 5px 0 5px 0;
    padding: 10px;
    pointer-events: auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    .toast_content {
        margin: 0;
        padding: 0 15px 0 15px;
        display: flex;
        align-self: center;
    }
    .toast_close {
        cursor: pointer;
        align-self: baseline;
        color: $toaster-default-color !important;
    }
}
.toast_success {
    background-color: $toaster-sucess-bg-color;
}
.toast_info {
    background-color: $toaster-info-bg-color;
}
.toast_warning {
    background-color: $toaster-warning-bg-color;
}
.toast_error {
    background-color: $toaster-error-bg-color;
}
</style>
