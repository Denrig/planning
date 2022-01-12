<template lang="pug">
  .rooms-list-page
    CustomTable(:headers="headers"
    :data="rooms"
    :loading="loading"
    @nextPageClicked="nextPageClicked"
    @previousPageClicked="previousPageClicked"
    )
      template(slot='items' slot-scope='{ props }')
        td.table-column {{props.name}}
        td.table-column
          BIcon(icon="play-fill" font-scale="2" @click="handleJoinRoom(props)")
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomTable from '@/components/common/CustomTable.vue';

export default {
  name: 'RoomsTable',

  components: {
    CustomTable,
  },

  data() {
    return {

      headers: [
        { text: 'Name' },
        { text: '' },
      ],
      totalCount: 0,
      params: { page: 1, per_page: 5 },
    };
  },

  computed: {
    ...mapGetters({
      rooms: 'room/rooms',
      loading: 'room/loading',
    }),
  },

  mounted() {
    this.fetchRooms();
  },

  methods: {
    ...mapActions({
      getRooms: 'room/getRooms',
    }),

    ...mapMutations({
      setCurrentRoom: 'room/SET_CURRENT_ROOM',
      handleUserModalState: 'modal/handleUserModalState',
    }),

    nextPageClicked() {
      if (this.totalCount / this.params.per_page < this.params.page) return;
      this.params.page += 1;
      this.fetchRooms();
    },

    previousPageClicked() {
      if (this.params.page === 1) return;
      this.params.page -= 1;
      this.fetchRooms();
    },

    fetchRooms() {
      this.getRooms(this.params).then((headers) => {
        this.params.page = parseInt(headers['x-current-page'], 10);
        this.totalCount = parseInt(headers['x-total'], 10);
      });
    },

    handleJoinRoom(room) {
      this.setCurrentRoom(room);
      this.$emit('joinRoomClicked');
    },
  },

};
</script>
