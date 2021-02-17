<template lang="pug">
  v-app
    v-main
      v-container.container__login.pa-0(fluid)
        div.login
          div.login__title
            p Login
            div.underline.primary
          p.login__subtitle {{ $t("login.welcome") }} <b> {{ $t("app_name") }} </b> <br /> {{ $t("login.enter_credentials") }}
          v-form(ref="loginForm" v-model="valid" :disabled="loading")
            v-text-field(outlined v-model="loginForm.login" :height="45" :label="$t('login.username')" append-icon="fa-user" :rules="[rules.required]" @keyup.enter="submit()")
            v-text-field(outlined v-model="loginForm.password" :label="$t('login.password')" :append-icon="showPwd ? 'fa-eye' : 'fa-eye-slash'" :type="showPwd ? 'text' : 'password'" :rules="[rules.required]" @click:append="showPwd = !showPwd" @keyup.enter="submit()")
            v-btn.login__btn(large elevation="0" color="primary" height="45px" width="100%" :disabled="!valid" :loading="loading" @click="submit()") {{ $t("login.login_button") }}

      Toaster

</template>

<script>
import Toaster from "../components/toaster/Toaster.vue";
export default {
  components: { Toaster },
  name: "Login",
  data() {
    return {
      valid: false,
      showPwd: false,
      loading: true,
      loginForm: {
        login: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || this.$t("rules.required"),
      },
    };
  },
  mounted () {
    this.check();
  },
  methods: {
    check () {
      this.$http.get('auth')
        .then(() => {
          this.$router.push('/');
        })
        .catch(() => {
          this.loading = false;
        })
    },
    submit () {
      if (!this.valid) {
        this.$refs.loginForm.validate();
        return;
      }
      this.loading = true;
      this.$http
        .post('auth/signin', this.loginForm)
        .then((response) => {
          // Redirect to home
          this.$user.login = response.data.login;
          this.$user.functions = response.data.functions;
          this.$router.push("/");
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container__login {
  display: flex;
  height: 100vh;
  justify-content: center;
}
.login {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 360px;
  height: 470px;
  padding: 90px 25px 50px 25px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  background-image: url("../assets/img/login-bg.svg");

  .login__title {
    display: flex;
    flex-direction: column;
    height: 41px;

    p {
      margin: 0;
      font-size: 32px;
      font-weight: bold;
      line-height: 38px;
    }

    .underline {
      height: 3px;
      width: 36px;
      margin-left: 2px;
    }
  }

  .login__subtitle {
    margin-top: 15px;
    margin-bottom: 30px;
    font-size: 16px;
    line-height: 20px;
    color: #727272;
  }
}
</style>
