<template lang="pug">
.create-room-modal
  Modal(
    size="large",
    modal-title="Rooms List",
    modal-description="Rooms List",
    v-show="roomsModal",
    @close="handleRoomsModalState(false)"
  )
    template(v-slot:modal-body)
      RoomsTable(ref="roomsTable" @joinRoomClicked="joinRoomClicked")

</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import Modal from '@/components/common/Modal.vue';
import RoomsTable from '@/components/rooms/RoomsTable.vue';

export default {
  name: 'RoomsModal',

  components: {
    Modal,
    RoomsTable,
  },

  computed: {
    ...mapGetters({
      roomsModal: 'modal/roomsModal',
    }),
  },

  watch: {
    roomsModal(val) {
      if (val) this.$refs.roomsTable.fetchRooms();
    },
  },

  methods: {
    ...mapMutations({
      handleRoomsModalState: 'modal/handleRoomsModalState',
      handleUserModalState: 'modal/handleUserModalState',
    }),

    joinRoomClicked() {
      this.handleRoomsModalState(false);
      this.handleUserModalState(true);
    },

  },

};
</script>
