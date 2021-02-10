<template lang="pug">
  router-view(:key="$route.fullPath")
</template>

<script>
// import BreadCrumb from '../components/breadcrumb/BreadCrumb.vue'
export default {
  name: "Main",
  // components: { BreadCrumb },
  data() {
    return {
      mini: null,
      connected: false,
      updateUser: false,
      updateUserForm: {
        isLoading: false,
        isValid: false,
        showCurrentPassword: false,
        showNewPassword: false,
        showRetypePassword: false,
        data: {
          currentPassword: "",
          newPassword: "",
          retypePassword: "",
        },
        rules: {
          required: (value) => !!value || this.$t("rules.required"),
        },
      },
      menus: [
        {
          icon: "fa-home",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "fa-tools",
          title: "Administration",
          to: "admin",
        },
      ],
    };
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
    closeUserForm() {
      this.updateUserForm.data.currentPassword = "";
      this.updateUserForm.data.newPassword = "";
      this.updateUserForm.data.retypePassword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
#app_main {
  height: 100%;
}
// .app_navigation {
//     min-width: 230px;
//     // background-color: $app-components-bg-color;
//     .app_title {
//         height: 60px;
//         text-align: center;
//     }
// }
// .app_container {
//     display: flex;
//     width: 100%;
//     flex-direction: column;
//     .app_content {
//         margin: 0;
//     }
//     .app_bar {
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//         height: 60px;
//         width: 100%;
//         // background-color: $app-components-bg-color;
//         .app_breadcrumb {
//             // color: $app-components-font-color;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             padding-left: 10px;
//             width: auto;
//         }
//         .app_user {
//             display: flex;
//             width: 61px;
//             .app_user__menu {
//                 border-top-left-radius: 0;
//                 border-top-right-radius: 0;
//                 border-bottom-right-radius: 0;
//             }
//             .app_user__list {
//                 // background-color: $app-components-bg-color;
//                 padding: 0;
//                 .app_user__list-item {
//                     padding-right: 10px;
//                     height: 60px;
//                 }
//                 .app_user__list-item--title {
//                     // color: $app-components-font-color;
//                     display: flex;
//                     justify-content: flex-end;
//                     .user_login {
//                         margin: 0;
//                         align-self: center;
//                         font-weight: 600;
//                         line-height: 10px;
//                         padding-right: 10px;
//                     }
//                 }
//             }
//         }
//     }
// }
// .update_user_form {
//     padding-top: 20px !important;
// }
</style>
