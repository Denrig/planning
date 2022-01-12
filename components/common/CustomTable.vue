<template lang="pug">
  .table-wrapper
    table.custom-table
      thead
        tr.table-headers
          th.table-header(v-for="(header, index) in headers" :key="index") {{header.text}}
      tbody(ref="tableBody")
        tr.table-row
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
        tr.table-row
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
        tr.table-row
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
        tr.table-row
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
          td.table-column Columnaa
    div.table-footer
      button.app-button(@click="slideItemsLeft") Previous Page
      button.app-button(@click="slideItemsRight") Next Page

</template>
<script>
export default {
  name: 'CustomTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    slideItemsRight() {
      Array.from(this.$refs.tableBody.children).forEach((child, index) => {
        setTimeout(() => {
          child.classList.remove('sliding-left');
          child.classList.add('sliding-right');
        }, index * 100);
      });
    },

    slideItemsLeft() {
      Array.from(this.$refs.tableBody.children).forEach((child, index) => {
        setTimeout(() => {
          child.classList.remove('sliding-right');
          child.classList.add('sliding-left');
        }, index * 100);
      });
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
  width: 70%;
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

    .table-column {
      text-align: center;
      padding: 10px;
    }
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
}
</style>
