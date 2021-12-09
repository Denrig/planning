<template lang="pug">
.cards-section.w-100
  .indicator(ref='indicator')
  button.app-button.cancel-vote(
    @click="handleCancelVote"
    :style="{ visibility: hasVoted ? 'initial' : 'hidden' }"
  ) Cancel Vote
  .card(v-for="card in cards" @click="handleCardClicked($event)" :key="card") {{ card }}

</template>
<script>
export default {
  name: 'VotingBar',
  data() {
    return {
      hasVoted: false,
      cards: [0.5, 1, 3, 5, 8, 13, 21, '?'],
    };
  },
  methods: {
    handleCardClicked(event) {
      const coords = event.target.getBoundingClientRect();
      const { indicator } = this.$refs;
      indicator.style.left = `${coords.x}px`;
      this.hasVoted = true;
      this.handleSelectNumber(event.target);
    },

    handleSelectNumber(currentElement) {
      this.removeCurrentActiveClass();
      currentElement.classList.add('active');
    },

    handleCancelVote() {
      this.hasVoted = false;
      this.removeCurrentActiveClass();
      this.$refs.indicator.style.left = '5vw';
    },

    removeCurrentActiveClass() {
      const element = document.getElementsByClassName('active')[0];
      if (element) {
        element.classList.remove('active');
      }
    },
  },
};
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
    left: 5vw;
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

  .cancel-vote {
    background-color: $pink;
    margin: auto 0;
    max-width: 150px;
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
