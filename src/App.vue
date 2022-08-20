<template>

  <v-app 
  >
    <Header 
      :gameName="recentGame.game" 
      id="header"
      @menuToggle="menuOpen = !menuOpen"
    />

    <Menu
      :menuOpen="menuOpen"
    />

    <v-container
      class="pa-5"
    >
      <v-main>
        <transition name="fade" mode="out-in">
          <router-view 
            :players="players" 
              @resetPlayers="resetPlayers"
              @addPlayer="addPlayer"
              @removePlayer="removePlayer"
              @assignTeam="assignTeam"
            :recentGame="recentGame" 
              @updateSetup="updateSetup"
              @addToProgress="addToProgress" 
              @gameOver="gameOver"

          />
        </transition>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Menu from './components/Menu'

export default {
  name: 'App',
  components: {
    Header,
    Menu
  },

  data: () => ({
    players: [], // an array of objects, zB: name: "Niko"
    recentGame: {
      setup: {}, // save the set rules, terms, teams, etc
      progress: [], // save an object for every round
      test_run: true,
    },
    menuOpen: false
  }),



  methods: {

    menuToggle(){
      this.menuOpen = !this.menuOpen
    },

    gameOver(){ //keep the players, reset rest
      this.recentGame.game = null
      this.recentGame.setup = {}
      this.recentGame.progress = []
    },
    
    // App.players is an array of strings
    resetPlayers(){
      this.players = []
    },

    addPlayer(player){
      let team = Math.floor(Math.random() * (3 - 1) + 1)
      let newPlayer = {"name": player, "team": team}
      this.players.push(newPlayer)
    },

    assignTeam(playerIndex, team){
        this.players[playerIndex].team = team
    },

    removePlayer(playerToRemove){
      // if an index has been passed
      if (typeof(playerToRemove) == "number") {
        this.players.splice(playerToRemove, 1)
        }
      // if a string for the name has been passed
      else {
        alert("App.vue -> feature of deletion by name not yet implemented!!!")
        let fick = this.players.find(x => x.name === playerToRemove)
      }
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