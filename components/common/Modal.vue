<template lang="pug">
transition(name="modal-fade")
  .custom-modal-backdrop
    .custom-modal.shadow(
      :class="size",
      :aria-labelledby="modalTitle",
      :aria-describedby="modalDescription",
      role="dialog"
    )
      button.btn-close(
        v-if="showCloseButton",
        type="button",
        @click="close",
        aria-label="Close modal"
      )
        span &times;
      slot(name="modal-header")
      slot(name="modal-body")
      slot(name="modal-footer")
</template>

<script>
export default {
  name: "Modal",

  props: {
    size: {
      type: String,
      required: false,
      default: "medium",
    },
    modalTitle: {
      type: String,
      required: true,
    },
    modalDescription: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      default: "",
    },
    displayed: {
      type: Boolean,
      default: false,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    displayed(newVal, oldVal) {
      if (newVal === true) this.$emit("show");
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
