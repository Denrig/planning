<template lang="pug">
.create-user-modal
  Modal(
    size="medium",
    modal-title="Create User",
    modal-description="Create User",
    v-show="userModal",
    :showCloseButton="false"
  )
    template(v-slot:modal-body)
      ValidationObserver(v-slot="{ handleSubmit }")
        form(@submit.prevent="handleSubmit(handleUserAction)")
          b-container
            b-row
              ValidationProvider.input-group.text(
                rules="required",
                name="roomsName",
                v-slot="{ errors, invalid, dirty }",
                tag="div"
              )
                input.w-100(
                  type="string",
                  v-model="form.name",
                  placeholder="Your Name",
                  :class="{ invalid: invalid && dirty }"
                )
          b-row
            label.info-text Choose Your Character Image
            HorizontalSelect.character-select(
              :items="characterImages",
              @itemSelected="handlePhotoChange"
            )
              template(v-slot:default="props")
                img(
                  :src="require(`~/assets/images/characters/${props.item}`)",
                  height=150,
                  width=100
                )

          b-row
            label.info-text Choose Your Role
            HorizontalSelect.role-select(
              :items="userRoles",
              @itemSelected="handleRoleSelect"
            )
              template(v-slot:default="props")
                img(
                  :src="require(`~/assets/images/roles/${props.item.image}`)",
                  height=100,
                  width=100
                )
                .role-name {{ props.item.role }}
          b-row 
            button.app-button.w-100.start-voting(@click="handleUserAction") Start Voting!
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Modal from "@/components/common/Modal.vue";
import HorizontalSelect from "@/components/common/HorizontalSelect.vue";
import CHARACTER_IMAGES from "@/utils/character-utils.js";

export default {
  name: "UserModal",

  components: {
    Modal,
    HorizontalSelect,
  },

  data() {
    return {
      form: {},
      characterImages: CHARACTER_IMAGES,
      userRoles: [
        {
          role: "player",
          image: "player.png",
        },
        {
          role: "spectator",
          image: "spectator.png",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      userModal: "modal/userModal",
      currentUser: "user/currentUser",
    }),
  },

  methods: {
    ...mapActions({
      handleUserModalState: "modal/handleUserModal",
      createUser: "user/createUser",
    }),

    handleUserAction() {
      this.handleCreateUser();
    },

    handleCreateUser() {
      this.createUser({ user: this.form });
    },

    handlePhotoChange(image) {
      this.form.character_image = image;
    },

    handleRoleSelect(role) {
      this.form.role = role.role;
    },
  },
};
</script>
<style lang="scss">
.role-select {
  justify-content: center;
  .item {
    flex-direction: column;
  }
  .role-name {
    font-size: $medium-text;
    font-weight: $bold;

    &::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>