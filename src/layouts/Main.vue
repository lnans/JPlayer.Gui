<template lang="pug">
v-app
  // Navigation Menu
  v-navigation-drawer.nav-drawer(
    v-model="drawer",
    v-if="connected",
    app,
    :color="isDark ? '' : 'primary'"
  )
    // Title
    .nav-drawer__title.white--text
      p {{ $t('app_name') }}

    v-divider.nav-drawer__divider(horizontal)

    // Menu items
    v-list.nav-drawer__menu-list.pt-8(nav)
      v-list-item-group
        v-list-item.menu-list__item(
          v-for="(item, idx) in displayableMenuItems",
          :key="idx",
          :to="item.to"
        )
          .menu-list__pin
          v-list-item-icon.menu-list__icon
            v-icon.white--text {{ item.icon }}
          v-list-item-title.menu-list__title.white--text {{ $t(item.title) }}

    v-spacer

    // User profile
    v-btn.nav-drawer__user(
      elevation="0",
      height="80",
      @click="formState.display = true"
    )
      .nav-drawer__user-content.white--text
        v-avatar.mx-6(size="45", color="grey") {{ $user.login[0] }}
        span {{ $user.login }}

  // App bar
  v-app-bar.app__bar(
    v-if="connected",
    app,
    elevation="0",
    :style="{ backgroundColor: isDark ? '#121212' : '#FFFFFF' }"
  )
    v-app-bar-nav-icon(@click="drawer = !drawer")
    v-toolbar-title.app__bar-title {{ $t(`router.${$route.name}`) }}
    v-spacer

    // Notifications
    v-btn.mt-2.mx-2(icon)
      v-icon far fa-bell

    // Parameters
    TinyMenu(icon="fa-cog")
      template(v-slot:content)
        v-row.ma-0.pl-5.pr-1.justify-space-between
          p.my-auto {{ $t('parameter.dark_mode') }}
          v-switch.ma-0.pa-0(
            v-model="$vuetify.theme.dark",
            inset,
            hide-details,
            @change="themeChange()",
            :ripple="false"
          )

    // Logout
    v-btn.mt-2.mx-2(icon, @click="signOutDialog = true")
      v-icon fa-power-off

  // Content
  v-main
    v-container.app__content(v-if="connected", fluid)
      v-slide-x-transition(hide-on-leave)
        router-view(:key="$route.fullPath")
    .app__loader(v-else)
      v-progress-circular(
        indeterminate,
        color="primary",
        :width="7",
        :size="50"
      )
      p.pt-2 {{ $t('loading') }}

  // Sign Out dialog
  v-dialog(v-model="signOutDialog", max-width="250")
    v-card
      v-card-text.text-align-center.bold.pa-0.pt-5 {{ $t('app_bar.sign_out_label') }}
      v-card-actions
        v-spacer
        v-btn(color="red", text, @click="signOut()") {{ $t('app_bar.sign_out') }}

  // User profile form
  Dialog(
    v-model="formState",
    :title="$t('credentials_form.title')",
    width="350"
  )
    template(v-slot:content)
      Form(
        v-model="formState",
        :contract="formContract",
        href="auth/updatecredentials",
        method="put",
        @onSuccess="onUpdateCredsSuccess($event)"
      )

  Toaster
</template>

<script>
import Toaster from "@/components/toaster/Toaster.vue";
import TinyMenu from "@/components/TinyMenu.vue";
import Form from "@/components/Form.vue";
import Dialog from "@/components/Dialog.vue";

export default {
  name: "Main",
  components: { Toaster, TinyMenu, Form, Dialog },
  data() {
    return {
      formState: { display: false, loading: false, valid: false },
      formContract: [
        {
          name: "currentPassword",
          label: "credentials_form.current_password",
          type: "password",
          rule: "required",
        },
        {
          name: "newPassword",
          label: "credentials_form.new_password",
          type: "password",
          rule: "required",
        },
        {
          name: "retypePassword",
          label: "credentials_form.retype_password",
          type: "password",
          rule: "required",
        },
      ],
      availableMenuItems: [
        { key: "dashboard", title: "menu.dashboard", to: "/", icon: "fa-home" },
        {
          key: "administration",
          title: "menu.administration",
          to: "/admin",
          icon: "fa-tools",
        },
      ],
      displayableMenuItems: [],
      connected: false,
      drawer: true,
      signOutDialog: false,
    };
  },
  async mounted() {
    await this.getUserInfo();
    await this.getMenuItems();
    this.connected = true;
  },
  methods: {
    signOut() {
      this.$http.delete("auth/signout").then(() => {
        this.$user.clear();
        this.$router.push("/login");
      });
    },
    async getUserInfo() {
      await this.$http.get("auth").then(async (response) => {
        this.$user.login = response.data.login;
        this.$user.functions = response.data.functions;
      });
    },
    async getMenuItems() {
      await this.$http.get("dashboard/menu").then((response) => {
        this.displayableMenuItems = this.availableMenuItems.filter((item) =>
          response.data.includes(item.key)
        );
      });
    },
    themeChange() {
      window.localStorage.setItem("dark", this.$vuetify.theme.dark);
    },
    onUpdateCredsSuccess() {
      this.$toaster.success("credentials_form.update_successfully");
    },
  },
};
</script>

<style lang="scss" scoped>
#app_main {
  height: 100%;
}
.app__content {
  padding: 30px 30px 0 30px;
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
.app__bar {
  .app__bar-title {
    font-weight: bold;
    opacity: 0.8;
  }
}

.nav-drawer {
  .nav-drawer__title {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
      margin: auto;
      font-weight: bold;
      font-size: 20px;
    }
  }
  .nav-drawer__divider {
    width: 80%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.4);
  }
  ::v-deep .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
  }
  .nav-drawer__menu-list {
    padding-left: 0;
    padding-right: 0;

    .menu-list__item.v-item--active .menu-list__pin {
      background-color: rgba(255, 255, 255, 0.5);
    }

    .menu-list__item {
      padding-left: 0;
      border-radius: 0;
      margin-bottom: 0;

      &::before {
        border-radius: 0;
      }

      .menu-list__pin {
        height: 56px;
        width: 12px;
      }
      .menu-list__icon {
        margin: auto 25px auto 17px;
        opacity: 0.9;
      }

      .menu-list__title {
        font-size: 18px;
        font-weight: bold;
        opacity: 0.9;
      }
    }
  }
  .nav-drawer__user {
    background-color: rgba(0, 0, 0, 0.1) !important;
    border-radius: 0 !important;
    text-transform: none;
    font-weight: bold;
    font-size: 16px;
    padding: 0;

    .nav-drawer__user-content {
      width: 100%;
      display: inline-flex;
      span {
        margin: auto 0;
      }
    }
  }
}
</style>
