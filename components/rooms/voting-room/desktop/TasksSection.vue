<template lang="pug">
  .tasks-section
    button.app-button.add-task(
      @click="handleAddTask"
    )
    .task(v-for="task in tasks" :key="task.id")
      .title {{task.title}}
      .description.h-75 
        p {{task.description}}
</template>
<script>
export default {
  name: 'TasksSection',

  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Bartai titlu pentru taskuri',
          description: 'Descrierea aia blanao Descrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanao'
        },        {
          id: 2,
          title: 'Bartai titlu pentru taskuri',
          description: 'Descrierea aia blanao Descrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanaoDescrierea aia blanao'
        }
      ]
    }
  },

  methods: {
    handleAddTask() {
      
    }
  }
}
</script>
<style lang="scss">
.tasks-section { 
  overflow: scroll;
  .task {
    margin: 10px;
    height: 150px;
    border-radius: 15px;
    box-shadow: inset 0 0 5px 2px $light-grey;
    
    .title, .description{
      padding: 10px
    }

    .description {
      overflow: hidden;
      font-size: $small-text;

      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
    }

    .title {
      height: 25%;
      text-align: center;
      font-size: $medium-text;
      font-weight: $medium;
      border-bottom: 2px solid $light-grey;
    }
  }

}
</style>