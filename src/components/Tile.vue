<template lang="pug">
v-card.tile(width="250", min-width="250", height="130", min-height="130" :to="to")
  v-card-title.tile__title {{ title }}
  v-card-text.tile__content
    p.tile__count {{ count }}
    v-icon {{ icon }}
</template>

<script>
export default {
  name: "Tile",
  props: {
    title: { type: String, required: true },
    icon: { type: String, default: "" },
    count: { type: Number, default: null },
    to: { type: String, default: null },
  },
};
</script>

<style lang="scss" scoped>
.tile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 30px 30px 0;
  padding: 10px 20px 20px 20px;
  .tile__title {
    padding: 0;
    font-weight: bold;
  }
  .tile__content {
    display: flex;
    justify-content: space-between;
    padding: 0;
    .tile__count {
      margin: auto 0;
      font-size: 28px;
      font-style: italic;
    }
  }
}
</style>