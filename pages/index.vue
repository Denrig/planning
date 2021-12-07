<template lang="pug">
.home-page
  b-carousel.carousel(
    id="carousel-fade"
    v-model="slide"
    :interval="5000"
    fade
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  )
    b-carousel-slide(v-for="image in images")
      template(v-slot:img)
        .carousel-image(:style="{ backgroundImage: `url(${image})` }")
  .menu-items-container
    MenuItem(backgroundColor="#fa357b")
      template(v-slot:header)
        span Join A Room
        BIcon(icon="door-open-fill")
    MenuItem(backgroundColor="#ffcf35")
      template(v-slot:header)
        span Create A Room
        BIcon(icon="cloud-plus-fill")
    MenuItem(backgroundColor="#4f4f4f")
      template(v-slot:header)
        span List Of Rooms
        BIcon(icon="view-list")
</template>>

<script>
import MenuItem from '@/components/home/MenuItem.vue'
import { BIcon } from 'bootstrap-vue'
export default {
  components:{
    MenuItem,
    BIcon
  },

  data(){
    return{
      slide: false,
      images: [
       'https://images3.alphacoders.com/106/1069102.jpg',
       'https://i.redd.it/v2cmfx8rbdv11.jpg',
       'https://i.pinimg.com/originals/7d/98/84/7d98840fdff1b2e7cd508cc7f3a17403.jpg'
      ]
    }
  },

  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>
<style lang="scss">
.home-page {
  display: flex;

  .menu-items-container {
      position: fixed;
      display: flex;
  }
}

@include media(">=desktop"){
  .home-page{
    flex-direction: column;
  
    .menu-items-container {
      justify-content: center;
      width: 100%;
      bottom: -300px;
    }
  } 
}

@include media("<desktop"){
.home-page .menu-items-container
   {
    flex-direction: column;
    right: 0;
    height: 100%;
  }
}
</style>
