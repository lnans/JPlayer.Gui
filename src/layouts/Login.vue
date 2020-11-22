<template>
    <v-app>
        <v-main>
            <v-container fluid id="app_root" class="d-flex justify-center">
                <v-card class="col-2 align-self-center">
                    <v-card-title class="text-h4">{{ $t('login.title') }}</v-card-title>
                    <v-card-subtitle>{{ $t('login.forgot_password') }} <br /> {{ $t('login.contact_admin') }}</v-card-subtitle>
                    <v-card-text>
                        <v-text-field
                            outlined
                            v-model="loginForm.login"
                            :label="$t('login.username')"
                            append-icon="fa-user"
                            :rules="[rules.required]">
                        </v-text-field>
                    </v-card-text>
                </v-card>
                <!-- <div class="login-container align-self-center">
                    <p class="login__title">{{ $t('login.title') }} </p>
                    <p class="login__subtitle"> {{ $t('login.forgot_password') }} <br /> {{ $t('login.contact_admin') }} </p>
                    <v-form v-model="valid" :disabled="loading">
                        <v-text-field
                            outlined
                            v-model="loginForm.login"
                            :label="$t('login.username')"
                            append-icon="fa-user"
                            :rules="[rules.required]">
                        </v-text-field>
                        <v-text-field
                            outlined
                            v-model="loginForm.password"
                            :label="$t('login.password')"
                            :append-icon="showPwd ? 'fa-eye' : 'fa-eye-slash'"
                            :type="showPwd ? 'text' : 'password'"
                            :rules="[rules.required]"
                            @click:append="showPwd = !showPwd">
                        </v-text-field>
                        <v-btn
                            large
                            class="login__btn"
                            color="primary"
                            width="100%"
                            :disabled="!valid"
                            :loading="loading"
                            @click="submit()">
                            {{ $t('login.login_button') }}
                        </v-btn>
                    </v-form>
                </div> -->
            </v-container>
            <Toaster />
        </v-main>
    </v-app>
</template>

<script>
import Toaster from '../components/toaster/Toaster.vue'
export default {
    components: { Toaster },
    name: 'Login',
    data () {
        return {
            valid: false,
            showPwd: false,
            loading: false,
            loginForm: {
                login: "",
                password: ""
            },
            rules: {
                required: value => !!value || this.$t('rules.required')
            }
        }
    },
    methods: {
        submit () {
            this.loading = true
            this.$http.post(`auth/signin`, this.loginForm)
                .then((response) => {
                    // Redirect to home
                    this.$user.login = response.data.login
                    this.$user.functions = response.data.functions
                    this.$router.push('/')
                })
                .catch(() => {
                    this.loading = false
                })
        }
    }
}
</script>

<style lang="scss" scoped>
#app_root {
    // background-color: $app-default-bg-color;
    height: 100%;
    max-height: 100%;
}
.login-container {
    background-color: #FFFFFF;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
    width: 380px;
    height: 410px;
    border-radius: 5px;
    padding: 35px 35px 50px 35px;
    .login__title {
        font-weight: bold;
        font-size: 36px;
        line-height: 43px;
        margin-bottom: 0;
    }
    .login__subtitle {
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 30px;
    }
    .login__btn {
        text-transform: none;
    }
}
</style>
