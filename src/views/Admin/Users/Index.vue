<template lang="pug">
v-container.main__content
  Card(:title="$t('administration.users.user_list')")
    template(v-slot:actions)
      v-btn.accent(
        elevation="0",
        fab,
        height="30",
        width="30",
        @click="formState.display = true"
      )
        v-icon(size="15") fa-plus
    template(v-slot:content)
      v-data-table(:items="users", :headers="headers", item-key="id")

  Dialog(v-model="formState", title="New user", width="350")
    template(v-slot:content)
      Form(
        v-model="formState",
        :contract="formContract",
        href="users",
        method="post"
      )
</template>

<script>
import Card from "@/components/Card.vue";
import Dialog from "@/components/Dialog.vue";
import Form from "@/components/Form.vue";
export default {
  name: "Users",
  components: { Card, Dialog, Form },
  data() {
    return {
      users: [],
      headers: [
        {
          text: this.$t("administration.users.data_table.login"),
          value: "login",
        },
        {
          text: this.$t("administration.users.data_table.deactivated"),
          value: "deactivated",
        },
        {
          text: this.$t("administration.users.data_table.creation_date"),
          value: "creationDate",
        },
        {
          text: this.$t("administration.users.data_table.read_only"),
          value: "readOnly",
        },
      ],
      formState: { display: false, loading: false, valid: false },
      formContract: [
        {
          name: "login",
          label: "administration.users.form.login",
          type: "text",
          rule: "required",
          icon: "fa-user",
        },
        {
          name: "password",
          label: "administration.users.form.password",
          type: "password",
          rule: "required",
        },
        {
          name: "profiles",
          label: "administration.users.form.profiles",
          type: "remote-dropdown",
          multiple: true,
          href: "profiles",
          itemKey: "id",
          itemValue: "name",
          rule: "required",
        },
      ],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$http.get("users").then((response) => {
        this.users = response.data.list;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>