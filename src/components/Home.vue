<template>
  <div>
    <v-row class="wrap justify-space-around my-2">
      <v-btn small v-if="recentGame" color="info" elevation="0">Resume Game</v-btn>
      <v-btn small @click="makeFriends" color="secondary" elevation="0"> Frends</v-btn>
      <router-link to="games">
        <v-btn small color="success" elevation="0">New Game</v-btn>
      </router-link>
    </v-row>
    
    <v-row class="justify-center my-2">
      <v-col
        xs="12"
        sm="6"
      >
        <PlayersManager
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
          },
          ]
      }
    },

    props: [
      'recentGame',
      'players'
    ],


    mounted(){
      //this.recentGame = this.$store.getters.getRecentGame
      //this.players = this.$store.getters.getPlayers
    },

    methods: {
      makeFriends(){
        let newPlayers = [
          "Niko",  
          "Peter",  
          "Jan",  
          "Henry",  
          "Maximilian",  
          "Dr Doom", 
          ]
        this.$emit("addPlayer", newPlayers)
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
