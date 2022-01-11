<template lang="pug">
  v-card(flat).v-card--custom-table
    v-card-title(v-if="showTitle").ml-2
      slot(name="header")

    v-data-table(
      ref="vDataTable"
      :headers='headers'
      :items='tableItems'
      :search="search"
      :footer-props="{ 'items-per-page-options': defaultRowsPerPage }"
      :server-items-length="totalItems"
      :options.sync="options"
      :hide-default-footer="hideFooter"
    ).elevation-0.v-data-table--custom-table

      template(slot='item' slot-scope='props')
        tr
          slot(name="items" v-bind:props="props")
      template(slot='no-data')
        tr(v-if="isLoading")
          td(v-for="h in headers")
            v-progress-circular(indeterminate)
      v-alert(v-if="showAlert" slot='no-results' :value='true' color='primary' icon='warning')
        | Your search for &quot;{{ search }}&quot; found no results.
</template>

<script>
export default {
  name: 'CustomTable',

  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    showAlert: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
      default: null,
    },
    showAll: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
    getItems: null,
    params: {},
    hideFooter: false,
  },

  data: () => ({
    defaultRowsPerPage: [5, 10, 20, 25],
    options: {
      itemsPerPage: 5,
    },
  }),

  computed: {
    tableItems() {
      return this.isLoading ? [] : this.items;
    },
  },

  watch: {
    options: {
      handler() {
        this.fetchItems();
      },
      deep: true,
    },

    params: {
      handler() {
        this.fetchItems();
      },
      deep: true,
    },

    search: {
      handler() {
        this.options.page = 1;
      },
    },
  },

  methods: {
    fetchItems() {
      this.$emit('getItems', {
        ...this.params,
        page: this.options.page,
        per_page: this.options.itemsPerPage,
      });
    },
  },
};
</script>
