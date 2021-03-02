import Vue from 'vue'

export const HelperMixins = {
  computed: {
    isDark () {
      return this.$vuetify.theme.dark
    }
  }
}

Vue.mixin(HelperMixins)