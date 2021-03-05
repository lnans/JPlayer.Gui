<template lang="pug">
v-dialog(
  :value="value.display",
  :persistent="value.loading",
  @click:outside="!value.loading ? updateModel('display', false) : () => {}",
  :max-width="width"
)
  v-card
    v-card-title.dialog__header.primary
      p.white--text.bold.my-auto {{ title }}
    v-card-text.pa-7.dialog__content
      slot(name="content")
    v-card-actions(v-if="hasActionSlot")
      slot(name="actions")
</template>

<script>
export default {
  name: "Dialog",
  props: {
    value: {
      type: Object,
      default() {
        return { display: false, loading: false };
      },
    },
    title: { type: String, required: true },
    width: { type: String, default: "700" },
  },
  computed: {
    hasActionSlot() {
      return !!this.$slots.footer;
    },
  },
  methods: {
    updateModel(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog__header {
  display: flex;
  justify-content: center;
  padding: 0 !important;
  height: 60px;
}
</style>