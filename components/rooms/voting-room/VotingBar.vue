<template lang="pug">
.cards-section.w-100
  .indicator(ref='indicator')
  .card(v-for="card in cards" @click="handleCardClicked($event)") {{ card }}    

</template>
<script>
export default {
name:'VotingBar',
data() {
  return {
    cards: [0.5, 1, 3, 5, 8, 13, 21, '?']
  }
 },
  methods: {
    handleCardClicked(event) {
      const coords = event.target.getBoundingClientRect();
      const indicator = this.$refs.indicator;
      indicator.style.left = `${coords.x}px`;

      this.handleSelectNumber(event.target);
    },

    handleSelectNumber(currentElement) {
      const previous = document.getElementsByClassName('active')[0]
      if(previous) {
        previous.classList.remove('active')
      }
      currentElement.classList.add('active');
    }
  }
}
</script>
<style lang="scss">
.cards-section{
  display: flex;
  justify-content: space-between;
  background-color: $grey;

  .indicator {
    position: relative;
    bottom: 50px;
    height: 100px;
    width: 100px;
    left: 50px;
    background-color: $pink;
    border-radius: 100%;
    border: 5px solid $white;
    transition: 0.5s;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      height: 20px;
      width: 20px;
      right: -22px;
      background: transparent;
      border-top-left-radius: 100%;
      box-shadow: 0 -10px 0 0 $white;
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      height: 20px;
      width: 20px;
      left: -22px;
      background: transparent;
      border-top-right-radius: 100%;
      box-shadow: 0 -10px 0 0 $white;
    }
  } 
 
  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: $white;
    width: 100px;
    height: 100%;
    border: none;
    font-size: $bigger-text;
    font-weight: $bold;
    transition: 0.5s;

    &.active {
      transform: translateY(-25px);
    }
  }
}
</style>