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
        td.table-column 2
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
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
      params: { page: 1, per_page: 2 },
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
  },

};
</script>
