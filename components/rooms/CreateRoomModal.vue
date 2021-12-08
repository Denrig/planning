<template lang="pug">
  .create-room-modal
    Modal(
      size="medium"
      modal-title="Create Room"
      modal-description="Create Room"
      v-show="createRoomModal"
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
                    rules="required"
                    name="roomsName"
                    v-slot="{ errors, invalid, dirty }"
                    tag="div"
                  )
                    input.w-100(
                      type="string"
                      placeholder="Room's name"
                      :class="{'invalid': invalid && dirty }"
                    )
              b-row
                b-col
                  ValidationProvider.input-group.text(
                    rules="required"
                    name="noUsers"
                    v-slot="{ errors, invalid, dirty }"
                    tag="div"
                  )
                    input(
                      type="number"
                      placeholder="Players Count"
                      :class="{'invalid': invalid && dirty }"
                    )
                b-col
                  ValidationProvider.input-group.checkbox(
                    rules="required"
                    name="code"
                    v-slot="{ errors, invalid, dirty }"
                    tag="div"
                  )
                    label Is Private?
                    b-form-checkbox(
                      type="checkbox"
                      size="lg"
                      :class="{'invalid': invalid && dirty }"
                    )
              b-row
                button.app-button.w-100(

                ) Create Room!
              

</template>
<script>
import Modal from '@/components/common/Modal'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Modal
  },

  computed: {
    ...mapGetters({
      createRoomModal: 'modal/createRoomModal'
    })
  },

  methods: {
    ...mapMutations({
      handleCreateRoomModalState: 'modal/handleCreateRoomModalState'
    }),

    handleCreateRoom(){
    }
  }
}
</script>
<style lang="scss">
.create-room-modal{
  .title {
    margin: 0 auto;
    font-size: $bigger-text;
    font-weight: $bold;
  }

}
</style>