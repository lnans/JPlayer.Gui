<template>
  <div id="toaster">
    <transition-group name="toast" tag="div" class="toast__container">
      <v-alert
        class="toast__message"
        v-for="message in toaster.messages"
        :key="message.id"
        dismissible
        border="left"
        :type="message.type"
        @input="close(message.id)"
      >
        {{ $t(message.value) }}
      </v-alert>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "Toaster",
  data() {
    return {
      toaster: {},
    };
  },
  beforeMount() {
    this.toaster = this.$toaster;
  },
  methods: {
    close(id) {
      this.toaster.remove(id);
    },
  },
};
</script>

<style lang="scss" scoped>
#toaster {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  z-index: 1000;
  top: 0;
  left: 0;
  pointer-events: none;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  .toast__container {
    width: 100%;
    max-width: 380px;
  }
  .toast__message {
    margin: 5px 0 5px 0;
    pointer-events: auto;
  }
}
.toast-leave-active {
  transition: all 0.3s;
}
.toast-leave-to {
  opacity: 0;
}
</style>
