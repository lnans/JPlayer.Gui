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
      // Remote dropdown fields
      v-select(
        v-if="field.type === 'remote-dropdown'",
        v-model="data[field.name]",
        :chips="field.multiple",
        :deletable-chips="field.multiple",
        :multiple="field.multiple",
        outlined,
        clearable,
        :menu-props="{ bottom: true, offsetY: true }",
        :label="$t(field.label)",
        :items="remoteItems[field.name] ? remoteItems[field.name].items : []",
        :item-value="field.itemKey",
        :item-text="field.itemValue",
        :loading="!remoteItems[field.name] || !remoteItems[field.name].ready",
        :disabled="!remoteItems[field.name] || !remoteItems[field.name].ready",
        :rules="[rules[field.rule]]",
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
      /** initiliaze states for each fields */
      state: this.contract.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: { show: false } }),
        0
      ),
      /** availables fields rules */
      rules: {
        required: (value) =>
          (Array.isArray(value) && !!value.length) ||
          (!Array.isArray(value) && !!value) ||
          this.$t("rules.required"),
      },
      /** form data to send */
      data: {},
      /** remote fields data */
      remoteItems: {},
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return { valid: false, loading: false };
      },
    },
    validateLabel: { type: String, default: "form.save" },
    validateWidth: { type: String, default: "150" },
    contract: { type: Array, required: true },
    href: { type: String, required: true },
    method: { type: String, required: true },
  },
  mounted() {
    this.fetchRemoteItems();
  },
  methods: {
    /**
     * Tricks to update the v-model Object
     */
    updateModel(key, value) {
      setImmediate(() => this.$emit("input", { ...this.value, [key]: value }));
    },
    /**
     * Validate forms and call API end point
     */
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
    /**
     * Fetch items for remote fields if needed
     */
    fetchRemoteItems() {
      this.contract.forEach((ctr) => {
        if (ctr.href) {
          this.$axios.get(ctr.href).then((response) => {
            this.remoteItems[ctr.name] = {
              items: response.data.list,
              ready: true,
            };
            this.$forceUpdate();
          });
        }
      });
    },
  },
  watch: {
    /**
     * v-model: display property
     * on false we reset the form
     * on true, we force all remote fields to reload
     */
    "value.display": function (value) {
      if (!value) {
        this.$refs.form.reset();
      } else {
        this.remoteItems = {};
        this.$forceUpdate();
        this.fetchRemoteItems();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form__content {
  width: 100%;
}
</style>