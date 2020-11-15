<template>
    <div id="main" v-if="connected">
        <!-- Side menu -->
        <v-navigation-drawer permanent dark class="app_navigation">
            <v-list-item class="px-2 app_title">
                <v-list-item-title>JPlayer</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item  v-for="menu in menus" :key="menu.title" :to="menu.to" link>
                    <v-list-item-icon>
                        <v-icon>{{ menu.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ menu.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- Main container -->
        <div class="app_container">
            <!-- App bar -->
            <div class="app_bar">
                <div class="app_breadcrumb">
                    <BreadCrumb></BreadCrumb>
                </div>
                <!-- User info -->
                <div class="app_user">
                    <v-divider vertical class="theme--dark"></v-divider>
                    <v-menu offset-y attach=".app_user" content-class="app_user__menu" min-width="240" nudge-left="180px" :close-on-content-click="false">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn dark v-bind="attrs" v-on="on" width="60" height="60" icon>
                                <v-icon size="30">fa-user-alt</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="app_user__list">
                            <v-divider horizontal dark></v-divider>
                            <v-list-item class="app_user__list-item">
                                <v-list-item-title class="app_user__list-item--title">
                                    <p class="user_login">{{ $user.login }}</p>
                                    <v-btn icon dark @click="updateUser = true"><v-icon size="15">fa-cog</v-icon></v-btn>
                                    <v-btn icon dark @click="signOut()"><v-icon size="15">fa-power-off</v-icon></v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <!-- Update user info dialog -->
                <v-dialog v-model="updateUser" width="500" @click:outside="closeUserForm()">
                    <v-card>
                        <v-card-title class="grey lighten-2">{{ $t('update_user_form.title') }}</v-card-title>
                        <v-card-text class="update_user_form">
                            <v-form v-model="updateUserForm.isValid" :disabled="updateUserForm.isLoading">
                                <v-text-field
                                    outlined
                                    v-model="updateUserForm.data.currentPassword"
                                    :label="$t('update_user_form.current_password')"
                                    :append-icon="updateUserForm.showCurrentPassword ? 'fa-eye' : 'fa-eye-slash'"
                                    :type="updateUserForm.showCurrentPassword ? 'text' : 'password'"
                                    :rules="[updateUserForm.rules.required]"
                                    @click:append="updateUserForm.showCurrentPassword = !updateUserForm.showCurrentPassword">
                                </v-text-field>
                                <v-text-field
                                    outlined
                                    v-model="updateUserForm.data.newPassword"
                                    :label="$t('update_user_form.new_password')"
                                    :append-icon="updateUserForm.showNewPassword ? 'fa-eye' : 'fa-eye-slash'"
                                    :type="updateUserForm.showNewPassword ? 'text' : 'password'"
                                    :rules="[updateUserForm.rules.required]"
                                    @click:append="updateUserForm.showNewPassword = !updateUserForm.showNewPassword">
                                </v-text-field>
                                <v-text-field
                                    outlined
                                    v-model="updateUserForm.data.retypePassword"
                                    :label="$t('update_user_form.retype_password')"
                                    :append-icon="updateUserForm.showRetypePassword ? 'fa-eye' : 'fa-eye-slash'"
                                    :type="updateUserForm.showRetypePassword ? 'text' : 'password'"
                                    :rules="[updateUserForm.rules.required]"
                                    @click:append="updateUserForm.showRetypePassword = !updateUserForm.showRetypePassword">
                                </v-text-field>
                                <v-btn
                                    large
                                    color="primary"
                                    width="100%"
                                    :disabled="!updateUserForm.isValid"
                                    :loading="updateUserForm.isLoading"
                                    @click="updateCredentials()">
                                    {{ $t('form.save') }}
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>
            <!-- Curent context -->
            <div class="app_content">
                <router-view :key="$route.fullPath" />
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '../components/breadcrumb/BreadCrumb.vue'
export default {
    name: 'Main',
    components: { BreadCrumb },
    data () {
        return {
            connected: false,
            updateUser: false,
            updateUserForm: {
                isLoading: false,
                isValid: false,
                showCurrentPassword: false,
                showNewPassword: false,
                showRetypePassword: false,
                data: {
                    currentPassword: '',
                    newPassword: '',
                    retypePassword: ''
                },
                rules: {
                    required: value => !!value || this.$t('rules.required')
                }
            },
            menus: [
                {
                    icon: 'fa-home',
                    title: 'Dashboard',
                    to: '/'
                },
                {
                    icon: 'fa-tools',
                    title: 'Administration',
                    to: 'admin'
                }
            ]
        }
    },
    mounted () {
        this.getUserInfo()
    },
    methods: {
        signOut () {
            this.$http.delete('auth/signout')
                .then(() => {
                    this.$user.clear()
                    this.$router.push('/login')
                })
        },
        updateCredentials () {
            this.$http.put('auth/updatecredentials', this.updateUserForm.data)
                .then(() => {
                    this.updateUser = false
                    this.$toaster.success('update_user_form.update_successfully')
                })
        },
        getUserInfo () {
            this.$http.get('auth')
                .then((response) => {
                    this.$user.login = response.data.login
                    this.$user.functions = response.data.functions
                    this.connected = true
                })
        },
        closeUserForm () {
            this.updateUserForm.data.currentPassword = ''
            this.updateUserForm.data.newPassword = ''
            this.updateUserForm.data.retypePassword = ''
        }
    }
}
</script>

<style lang="scss" scoped>
#main {
    height: 100%;
    width: 100%;
    display: flex;
}
.app_navigation {
    min-width: 230px;
    background-color: $app-components-bg-color;
    .app_title {
        height: 60px;
        text-align: center;
    }
}
.app_container {
    display: flex;
    width: 100%;
    flex-direction: column;
    .app_content {
        margin: 0;
    }
    .app_bar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 60px;
        width: 100%;
        background-color: $app-components-bg-color;
        .app_breadcrumb {
            color: $app-components-font-color;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 10px;
            width: auto;
        }
        .app_user {
            display: flex;
            width: 61px;
            .app_user__menu {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
            .app_user__list {
                background-color: $app-components-bg-color;
                padding: 0;
                .app_user__list-item {
                    padding-right: 10px;
                    height: 60px;
                }
                .app_user__list-item--title {
                    color: $app-components-font-color;
                    display: flex;
                    justify-content: flex-end;
                    .user_login {
                        margin: 0;
                        align-self: center;
                        font-weight: 600;
                        line-height: 10px;
                        padding-right: 10px;
                    }
                }
            }
        }
    }
}
.update_user_form {
    padding-top: 20px !important;
}
</style>
