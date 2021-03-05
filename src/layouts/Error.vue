<template lang="pug">
v-app
  v-main
    v-container#app_error(
      fluid,
      v-bind:class="`d-flex d-${$breakpoint}-flex flex-column justify-center justify-${$breakpoint}-center`"
    )
      v-card(
        v-bind:class="`error-card rounded-0 col-3 col-${$breakpoint}-3 align-self-center align-self-${$breakpoint}-center`",
        :dark="$vuetify.theme.isDark",
        :elevation="1"
      )
        v-card-text.d-flex.flex-column.align-content-center
          v-icon.pa-5(:size="40") fa-exclamation-triangle
          p(v-bind:class="`text-center text-h6 text-${$breakpoint}-h6 ma-0`") {{ $t('error.something_wrong') }}
          p.text-center.pa-0 {{ $t('error.under_maintenance') }}
</template>

<script>
export default {
  name: "Error",
};
</script>

<style lang="scss" scoped>
#app_error {
  height: 100%;
}
.error-card {
  min-width: 250px;
}
</style>
