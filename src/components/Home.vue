<template>
  <div>


      <router-link to="charades/setup">
        <img src="images/icons/puke.svg" alt="" >
      </router-link>      

    <v-row class="wrap justify-space-around my-2">
      <v-btn small v-if="recentGame & recentGame.test_run" color="info" elevation="0">Resume Game</v-btn>
      <v-btn small v-if="recentGame.test_run" @click="makeFriends" color="secondary" elevation="0"> Frends</v-btn>
      <router-link to="charades/setup">
        <v-btn small color="success" elevation="0">Let's go!</v-btn>
      </router-link>
    </v-row>
    
    <v-row class="justify-center my-2">
      <v-col
        xs="12"
        sm="6"
      >
        <PlayersManager
          v-if="false"
          :players="players"
          @addPlayer="addPlayer"
          @removePlayer="removePlayer"
        />
      </v-col>
    </v-row>
    <p class="text-center grey--text ">Dosenbier saufen!</p>

  </div>
</template>

<script>
  import PlayersManager from './PlayersManager'
  import LineGraph from './games/charades/play/LineGraph.vue'

  export default {
    name: 'Home',

    components: {
      PlayersManager,
      LineGraph

    },

    data(){
      return {
        deleteMe: [{
            name: "Team 1",
            data: [1, 3, 6, 8, 12],
          },
          {
            name: "Team 2",
            data: [0, 1, 1, 4, 8]
          },],
        counter: 0,
      }
    },

    props: [
      'recentGame',
      'players'
    ],


    mounted(){
      //this.recentGame = this.$store.getters.getRecentGame
      //this.players = this.$store.getters.getPlayers
      if (localStorage.counter){
        this.counter = Number(localStorage.counter)
      } 
    },

    methods: {
      makeFriends(){
        let newPlayers = [
          "Niko",  
          "Peter",  
          "Jan",  
          "Henry",  
          "Maximilian",  
          "Doom", 
          ]
        newPlayers.forEach((player) =>{
          this.$emit("addPlayer", player)
        })
      },
      
      addPlayer(player){
        this.$emit('addPlayer', player)
      },

      removePlayer(nameToRemove){
          this.$emit("removePlayer", nameToRemove)
        },

    }
  }
</script>

<style scoped>
  img {
    width: 90%;
    max-width: 300px;
    display: block;
    margin-left: auto;
    margin-right: auto;   
    margin-bottom: 20px;
    border-radius: 20px;
  }
</style>