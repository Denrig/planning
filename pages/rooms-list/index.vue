<template lang="pug">
  .container
   Button Text
</template>
<script>
import Button from '@/components/common/Button.vue';

export default {
  components: {
    Button,
  },
};
</script>
<style lang="scss">
.container {
  margin: 500px calc(50% - 250px);
  width: 500px;
}
</style>
