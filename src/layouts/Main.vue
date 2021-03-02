<template lang="pug">
  v-app

    // Navigation Menu
    v-navigation-drawer.nav-drawer(v-model="drawer" v-if="connected" app)
      div.nav-drawer__title Title
      v-divider.nav-drawer__divider(horizontal)
      v-list.pt-8(nav)
        v-list-item-group
          v-list-item(v-for="(item, idx) in menuItems" :key="idx" :to="item.to")
            v-list-item-icon
              v-icon {{ item.icon }}
            v-list-item-title {{ $t(item.title) }}
      v-spacer
      v-btn.nav-drawer__user(elevation="0" height="80")
        div.nav-drawer__user-content
          v-avatar.mx-6(size="45" color="grey") {{ $user.login[0] }}
          span {{ $user.login }}

    // App bar
    v-app-bar.app__bar(v-if="connected" app elevation="0" :style="{ backgroundColor: isDark ? '#121212' : '#FFFFFF' }")
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
            v-switch.ma-0.pa-0(v-model="$vuetify.theme.dark" inset hide-details @change="themeChange()" :ripple="false")

      // Logout
      v-btn.mt-2.mx-2(icon @click="signOut()")
        v-icon fa-power-off

    // Content
    v-main
      v-container(v-if="connected" fluid)
        v-slide-x-transition(hide-on-leave)
          router-view(:key="$route.fullPath")
      div.app__loader(v-else)
        v-progress-circular(indeterminate color="primary" :width="7" :size="50")
        p.pt-2 {{ $t('loading') }}
</template>

<script>
import TinyMenu from '@/components/TinyMenu.vue'
export default {
  name: "Main",
  components: { TinyMenu },
  data() {
    return {
      connected: false,
      drawer: true,
      menuItems: [
        { title: 'menu.dashboard', to: '/', icon: 'fa-home' },
        { title: 'menu.administration', to: '/admin', icon: 'fa-tools' }
      ]
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
    themeChange() {
      window.localStorage.setItem('dark', this.$vuetify.theme.dark)
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
.app__bar-title {
  font-weight: bold;
  opacity: 0.8;
}
.nav-drawer {
  .nav-drawer__title {
    height: 64px;
  }
  .nav-drawer__divider {
    width: 80%;
    margin: 0 auto;
  }
  ::v-deep .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
  }
  .nav-drawer__user {
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
