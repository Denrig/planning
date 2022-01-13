<template lang="pug">
.create-room-modal
  Modal(
    size="medium",
    modal-title="Create Room",
    modal-description="Create Room",
    v-show="createRoomModal",
    @close="handleCreateRoomModalState(false)"
  )
    template(v-slot:modal-header)
      .title.shadow-sm Create Room
    template(v-slot:modal-body)
      ValidationObserver(v-slot="{ handleSubmit }")
        form(@submit.prevent="handleSubmit(handleCreateRoom)")
          b-container
            b-row
              b-col
                ValidationProvider.input-group.text(
                  rules="required",
                  name="name",
                  v-slot="{ errors, invalid, dirty }",
                  tag="div"
                )
                  input.w-100(
                    type="string",
                    v-model="form.name",
                    placeholder="Room's name",
                    :class="{ invalid: errors[0] }"
                  )
                  span.error {{ errors[0] }}
            //- b-row TO DO: Enable this in a future iteration
            //-   b-col
            //-     ValidationProvider.input-group.text(
            //-       rules="required",
            //-       name="noUsers",
            //-       v-slot="{ errors, invalid, dirty }",
            //-       tag="div"
            //-     )
            //-       input(
            //-         type="number",
            //-         v-model="form.players_count",
            //-         placeholder="Players Count",
            //-         :class="{ invalid: invalid && dirty }"
            //-       )
            //-   b-col
            //-     ValidationProvider.input-group.checkbox(
            //-       rules="required",
            //-       name="code",
            //-       v-slot="{ errors, invalid, dirty }",
            //-       tag="div"
            //-     )
            //-       label Is Private?
            //-       b-form-checkbox(
            //-         type="checkbox",
            //-         size="lg",
            //-         v-model="form.is_private",
            //-         :class="{ invalid: invalid && dirty }"
            //-       )
            b-row
              input.app-button.w-100(type="submit" value="Create Room!")
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Modal from '@/components/common/Modal.vue';
import { notifySuccess } from '~/utils/notificationsUtils.js';

export default {
  components: {
    Modal,
  },

  data() {
    return {
      form: {},
    };
  },

  computed: {
    ...mapGetters({
      createRoomModal: 'modal/createRoomModal',
      currentRoom: 'room/currentRoom',
    }),
  },

  methods: {
    ...mapMutations({
      handleCreateRoomModalState: 'modal/handleCreateRoomModalState',
    }),
    ...mapActions({
      createRoom: 'room/createRoom',
    }),

    handleCreateRoom() {
      this.createRoom({ room: this.form }).then(() => {
        notifySuccess(this, 'Your room is now open!');
        this.$emit('completed');
      });
    },
  },
};
</script>
