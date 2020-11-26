<template>
    <v-app>
        <v-main>
            <v-container fluid id="app_error" v-bind:class="`d-flex d-${$breakpoint}-flex flex-column justify-center justify-${$breakpoint}-center`">
                <v-card v-bind:class="`error-card rounded-0 col-3 col-${$breakpoint}-3 align-self-center align-self-${$breakpoint}-center`" :dark="$vuetify.theme.isDark" :elevation="1">
                    <v-card-text class="d-flex flex-column align-content-center">
                        <v-icon class="pa-5" :size="40">fa-exclamation-triangle</v-icon>
                        <p v-bind:class="`text-center text-h6 text-${$breakpoint}-h6 ma-0`">Oops ! something went wrong...</p>
                        <p class="text-center pa-0">Maybe the application is under maintenance</p>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'Error'
}
</script>

<style lang="scss" scoped>
#app_error {
    height: 100%;
}
.error-card {
    min-width: 250px;
}
</style>
