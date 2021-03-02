<template lang="pug">
  router-view
</template>
<script>
export default {
  name: 'App',
  mounted () {
    this.$vuetify.theme.dark = window.localStorage.getItem('dark') === 'true'
  }
}
</script>
<style lang="sass">
@import '~@/styles/_font.sass'
@import '~@/styles/_global.sass'
</style>
