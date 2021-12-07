<template lang="pug">
.home-page
  b-carousel.carousel(
    id="carousel-fade"
    fade
    :interval="5000"
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
      template(v-slot:content)
        .details-text You can easily enter a room just by entering the code of the room down below.
        ValidationObserver(v-slot="{ handleSubmit }")
          form(@submit.prevent="handleSubmit(handleCheckCode)")
            ValidationProvider.input-group.text(
              rules="required"
              name="code"
              v-slot="{ errors, invalid, dirty }"
              tag="div"
            )
              label(for="input_email")
              input#code(
                type="string"
                placeholder="CODE"
                v-model="code"
                :maxlength="6"
                :class="{'invalid': invalid && dirty }"
              )
    MenuItem.create-room-section(backgroundColor="#ffcf35")
      template(v-slot:header)
        span Create A Room
        BIcon(icon="cloud-plus-fill")
      template(v-slot:content)
        .details-text
          span This section is used for creating a new planning room.
          span Click on the 'Create Room' button and you will be redirected to the room creation page.
        .app-link.create-room-button
          nuxt-link(to="create-room") Create Room
    MenuItem.rooms-list-section(backgroundColor="#4f4f4f")
      template(v-slot:header)
        span List Of Rooms
        BIcon(icon="view-list")
      template(v-slot:content)
        .details-text
          span You don't have a code to enter the room, search through the list and find the one you're looking for!
        .app-link.rooms-list-button
          nuxt-link(to="rooms-list") Go Now!
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
      code: null,
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
    },
    handleCheckCode(){
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

  .create-room-button {
    background-color: $grey;
    color: $yellow;
  }

  .rooms-list-button {
    background-color: $yellow;
    color: $grey;
  }

  .create-room-section{
    color: $grey;
  }

  .rooms-list-section{
    color: $yellow;
  }
}

@include media(">=desktop"){
  .home-page{
    flex-direction: column;
     
    .details-text { 
      text-align: center;
    }

    .menu-items-container {
      justify-content: center;
      width: 100%;
      bottom: -300px;
    }

    .details-text { 
      font-size: $big-text;
    }

    .app-links {
      margin-top: 30px;
    }
  } 
}

@include media("<desktop"){
.home-page .menu-items-container
   {
    flex-direction: column;
    right: 0;
    height: 100%;

    .details-text { 
      font-size: $small-text;
    }
  }
}
</style>
