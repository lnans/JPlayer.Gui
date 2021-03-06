<template lang="pug">
.d-flex.flex-column.align-center
  v-form.form__content(
    ref="form",
    :value="value.valid",
    :disabled="value.loading",
    @input="updateModel('valid', $event)"
  )
    template(v-for="(field, idx) in contract")
      // Text fields
      v-text-field(
        v-if="field.type === 'text'",
        v-model="data[field.name]",
        outlined,
        :key="idx",
        :label="$t(field.label)",
        :append-icon="field.icon",
        type="text",
        :rules="[rules[field.rule]]",
        @keyup.enter="validate()"
      )
      // Password fields
      v-text-field(
        v-if="field.type === 'password'",
        v-model="data[field.name]",
        outlined,
        :key="idx",
        :label="$t(field.label)",
        :append-icon="state[field.name].show ? 'fa-eye' : 'fa-eye-slash'",
        :type="state[field.name].show ? 'text' : 'password'",
        :rules="[rules[field.rule]]",
        @click:append="state[field.name].show = !state[field.name].show",
        @keyup.enter="validate()"
      )

  // Validate button
  v-btn.mt-3(
    large,
    height="45",
    :width="validateWidth",
    color="primary",
    elevation="0",
    :loading="value.loading",
    :disabled="value.loading || !value.valid",
    @click="validate()"
  )
    | {{ $t(validateLabel) }}
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      state: this.contract.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: { show: false } }),
        0
      ),
      rules: {
        required: (value) => !!value || this.$t("rules.required"),
      },
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return { valid: false, loading: false };
      },
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    validateLabel: { type: String, default: "form.save" },
    validateWidth: { type: String, default: "150" },
    contract: { type: Array, required: true },
    href: { type: String, required: true },
    method: { type: String, required: true },
  },
  methods: {
    updateModel(key, value) {
      setImmediate(() => this.$emit("input", { ...this.value, [key]: value }));
    },
    validate() {
      if (!this.value.valid) {
        this.$refs.form.validate();
        return;
      }
      this.updateModel("loading", true);
      this.$http
        .request({ url: this.href, method: this.method, data: this.data })
        .then((response) => {
          this.updateModel("loading", false);
          this.updateModel("display", false);
          this.$refs.form.reset();
          this.$emit("onSuccess", response);
        })
        .catch((err) => {
          this.updateModel("loading", false);
          this.$emit("onError", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form__content {
  width: 100%;
}
</style>