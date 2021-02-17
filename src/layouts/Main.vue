<template lang="pug">
  v-app(v-else)
    v-main
      div.app__loader(v-if="!connected")
        v-progress-circular(indeterminate color="primary" :width="7" :size="50")
        p.pt-2 {{ $t('loading') }}
      router-view(v-else :key="$route.fullPath")
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      connected: false,
    };
  },
  mounted () {
    this.getUserInfo();
  },
  methods: {
    signOut() {
      this.$http.delete("auth/signout").then(() => {
        this.$user.clear();
        this.$router.push("/login");
      });
    },
    updateCredentials() {
      this.$http
        .put("auth/updatecredentials", this.updateUserForm.data)
        .then(() => {
          this.updateUser = false;
          this.$toaster.success("update_user_form.update_successfully");
        });
    },
    getUserInfo() {
      this.$http.get("auth").then((response) => {
        this.$user.login = response.data.login;
        this.$user.functions = response.data.functions;
        this.connected = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#app_main {
  height: 100%;
}
.app__loader {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-style: italic;
  }
}
</style>
