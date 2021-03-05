<template lang="pug">
v-app
  v-main
    v-container.container__login.pa-0(fluid)
      .login(:class="isDark ? 'login--dark' : ''")
        .login__title
          p Login
          .underline.primary
        p.login__subtitle {{ $t('login.welcome') }} <b> {{ $t('app_name') }} </b> <br /> {{ $t('login.enter_credentials') }}
        Form(
          v-model="formState",
          :contract="formContract",
          href="auth/signin",
          method="post",
          validateLabel="login.login_button",
          validateWidth="100%",
          @onSuccess="onSuccess($event)"
        )

    Toaster
</template>

<script>
import Toaster from "@/components/toaster/Toaster.vue";
import Form from "@/components/Form.vue";

export default {
  components: { Toaster, Form },
  name: "Login",
  data() {
    return {
      formState: { loading: false },
      formContract: [
        {
          name: "login",
          label: "login.username",
          type: "text",
          icon: "fa-user",
          rule: "required",
        },
        {
          name: "password",
          label: "login.password",
          type: "password",
          rule: "required",
        },
      ],
    };
  },
  mounted() {
    this.check();
  },
  methods: {
    check() {
      this.$http
        .get("auth")
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onSuccess(response) {
      // Redirect to home
      this.$user.login = response.data.login;
      this.$user.functions = response.data.functions;
      this.$router.push("/");
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

.login--dark {
  border: solid 1px #363636;
  .login__title {
    opacity: 0.8;
  }
}
</style>
