<template>
    <v-app>
        <v-main>
            <router-view />
            <Toaster />
        </v-main>
    </v-app>
</template>
<script>
import Toaster from './components/toaster/Toaster.vue'
export default {
    components: { Toaster }
}
</script>
<style lang="sass">
@import './styles/font.sass'
@import './styles/variables.sass'
@import './styles/style.sass'
</style>
