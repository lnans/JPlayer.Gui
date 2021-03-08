<template lang="pug">
v-card(width="100%")
  v-card-title.primary.white--text.bold.d-flex.justify-space-between
    p.ma-0 {{ title }}
    slot(name="actions")
  v-card-text.pa-0
    slot(name="content")
</template>

<script>
export default {
  name: "Card",
  props: {
    title: { type: String, required: true }
  }
};
</script>

<style lang="scss" scoped>
</style>