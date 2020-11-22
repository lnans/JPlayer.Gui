<template>
    <v-app>
        <v-main>
            <v-container fluid id="app_root" v-bind:class="`d-flex d-${breakpoint}-flex flex-column justify-center justify-${breakpoint}-center`">
                <v-card v-bind:class="`login-card col-3 col-${breakpoint}-3 align-self-center align-self-${breakpoint}-center`" :dark="$vuetify.theme.isDark">
                    <v-card-title>
                        <p v-bind:class="`text-center text-h4 text-${breakpoint}-h4 col-12 col-${breakpoint}-12 ma-0`">{{ $t('app_name') }}</p>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="loginForm" v-model="valid" :disabled="loading">
                            <v-text-field
                                outlined
                                v-model="loginForm.login"
                                :label="$t('login.username')"
                                append-icon="fa-user"
                                :rules="[rules.required]"
                                @keyup.enter="submit()">
                            </v-text-field>
                            <v-text-field
                                outlined
                                v-model="loginForm.password"
                                :label="$t('login.password')"
                                :append-icon="showPwd ? 'fa-eye' : 'fa-eye-slash'"
                                :type="showPwd ? 'text' : 'password'"
                                :rules="[rules.required]"
                                @click:append="showPwd = !showPwd"
                                @keyup.enter="submit()">
                            </v-text-field>
                            <p>{{ $t('login.forgot_password') }} <br /> {{ $t('login.contact_admin') }}</p>
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
                    </v-card-text>
                </v-card>
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
    mounted () {
        console.log(this)
        console.log(this.$test)
    },
    computed: {
        breakpoint () {
            return this.$vuetify.breakpoint.name
        }
    },
    methods: {
        submit () {
            if (!this.valid) {
                this.$refs.loginForm.validate()
                return
            }
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
    height: 100%;
}
.login-card {
    min-width: 250px;
}
</style>
