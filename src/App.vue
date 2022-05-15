<template>

  <v-app 
  >
    <Header :gameName="recentGame.game" id="header"/>
    <v-container
      class="pa-5"
    >
      <v-main>
        <transition name="fade" mode="out-in">
          <router-view 
            @endRecentGame="endRecentGame"
            :players="players" 
              @resetPlayers="resetPlayers"
              @addPlayer="addPlayer"
              @removePlayer="removePlayer"
            :recentGame="recentGame" 
              @updateSetup="updateSetup"
              @addToProgress="addToProgress" 
          />
        </transition>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
    components: {
      Header,
    },

  data: () => ({
    players: [], // an array of strings, each being a player's name
    recentGame: {
      setup: {}, // save the set rules, terms, teams, etc
      progress: [] // save an object for every round
    }
  }),



  methods: {
    endRecentGame(){ //keep the players, reset rest
      this.recentGame.game = null
      this.recentGame.setup = {}
      this.recentGame.progress = []
    },
    
    // App.players is an array of strings
    resetPlayers(){
      this.players = []
    },


    addPlayer(player){
      if (typeof player != "string"){
        this.players = this.players.concat(player)
      } else {
        this.players.push(player)
      }
},

    removePlayer(nameToRemove){
      // return the array of players but filter out the nameToRemove
      this.players = this.players.filter(function (playerName) {
        return playerName != nameToRemove
      });
    },

    shufflePlayers(){
      console.log("I didn't fucking implement that function yet")
    },

    updateSetup(newSetup){ 
      //expect the full setup object from a child
      this.recentGame.setup = newSetup
    },

    addToProgress(newInfo){
      // keep an array of everything that happens
      this.recentGame.progress.push(newInfo)
    },
  }
};
</script>


<style scoped>
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease-out;
  }
</style>