<template lang="pug">
  .table-wrapper
    table.custom-table
      thead
        tr.table-headers
          th.table-header(v-for="(header, index) in headers" :key="index") {{header.text}}
      tbody(ref="tableBody")
        template(v-if="data.length > 0 || loading")
          tr.table-row.right(v-for="(props, index) in localItems" :key="index")
            slot(name="items" v-bind:props="props")
          Loader
        tr.no-data(v-else)
          td(:colspan="headers.length") No data available!
    div.table-footer
      button.app-button(@click="$emit('previousPageClicked')")
        BIcon(icon="arrow-bar-left" font-scale="2")
      button.app-button(@click="$emit('nextPageClicked')")
        BIcon(icon="arrow-bar-right" font-scale="2")
</template>
<script>
import Loader from './Loader.vue';

export default {
  name: 'CustomTable',

  components: {
    Loader,
  },

  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localItems: [],
    };
  },

  watch: {
    loading(val) {
      if (val) this.slideItemsRight();
      else {
        setTimeout(() => {
          Promise.resolve()
            .then(() => { this.localItems = this.data; })
            .then(() => this.slideItemsLeft());
        }, 1000);
      }
    },
  },

  methods: {
    slideItemsRight() {
      this.slideItems((child) => {
        child.classList.remove('sliding-left');
        child.classList.add('sliding-right');
      });
    },

    slideItemsLeft() {
      this.slideItems((child) => {
        child.classList.remove('right');
        child.classList.remove('sliding-right');
        child.classList.add('sliding-left');
      });
    },

    slideItems(callback) {
      if (this.$refs.tableBody) {
        Array.from(this.$refs.tableBody.children).forEach((child, index) => {
          setTimeout(() => {
            callback(child);
          }, index * 100);
        });
      }
    },
  },
};
</script>
<style lang="scss">
.table-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px;
}

.custom-table {
  overflow: hidden;
  width: 100%;
  border: 1px solid $black ;
  border-radius: 20px 20px 0 0;
  border-collapse: separate;
  font-style: $bold;
  background-color: $grey;

  .table-headers {
    color: $white;
  }

  .table-header{
    width: 100px;
    text-align: center;
    border-right: 1px solid $light-grey;
    border-bottom: 1px solid $white;
    padding: 10px;
    &:last-of-type{
      border-right: none;
    }
  }

  .table-row {
    position: relative;
    z-index: 1;

    &:nth-of-type(even) {
      background-color: $yellow;
    }

    &:nth-of-type(odd) {
      background-color: $pink;
      color: $white;
    }

    &.sliding-left {
      animation: sliding-left 1s forwards
    }

    &.sliding-right {
      animation: sliding-right 1s forwards
    }

    &.right {
      right: -100%;
    }

    .table-column {
      text-align: center;
      padding: 10px;
    }
  }

  .no-data {
    text-align: center;
    color: $white;
    td {
      padding: 10px;
    }
  }

  tbody {
    height: 100px;
    position: relative;
  }

  .loader {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}

.table-footer {
  display: flex;
  width: 100%;
  border: 1px solid $black;
  border-top: none;
  justify-content: space-between;
  background-color: $grey;
  border-radius: 0 0 20px 20px;

  .app-button {
    margin: 0 10px;
    background-color: transparent;
  }
}
</style>
