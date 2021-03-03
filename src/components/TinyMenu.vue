<template lang="pug">
  v-menu(:close-on-content-click="false" transition="slide-y-transition" offset-y)
    template(v-slot:activator="{ on, attrs }")
      v-btn.mt-2.mx-2(v-bind="attrs" v-on="on" icon)
        v-icon {{ icon }}
    div(:style="{ width: `${width}px`, backgroundColor: isDark ? '#363636' : '' }")
      slot(name="content")
</template>

<script>
export default {
  name: "TinyMenu",
  props: {
    icon: { type: String, required: true },
    width: { type: String, default: '200'}
  }
}
</script>
