<template lang="pug">
.horizontal-select.w-100(v-dragscroll="true", ref="horizontalSelect")
  .item(v-for="item in items", @click="handleSelectItem($event, item)")
    slot(:item="item")
</template>
<script>
export default {
  name: 'HorizontalScroll',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleSelectItem(event, item) {
      const previous = this.$refs.horizontalSelect.querySelector('.selected');
      if (previous) previous.classList.remove('selected');

      const { target } = event;
      let element = event.target;
      if (target.parentElement._prevClass === 'item') { element = target.parentElement; }
      element.classList.add('selected');

      this.$emit('itemSelected', item);
    },

    selectByIndex(index) {
      const { horizontalSelect } = this.$refs;
      const element = horizontalSelect.children[index];
      if (element) element.classList.add('selected');
    },
  },
};
</script>
<style lang="scss">
.horizontal-select {
  display: flex;
  align-items: center;
  height: 200px;
  overflow-x: scroll;
  overflow-y: hidden;
  cursor: pointer;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    height: 150px;
    width: 150px;
    margin: 15px 10px;
    border-radius: 5px;
    background-color: $light-grey;

    &.selected {
      border: 5px solid royalblue;
    }
  }
}
</style>
