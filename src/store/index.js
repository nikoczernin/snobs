import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [], // an array of strings, each being a player's name
    recentGame: {
      gameName: "", // game name
      setup: {}, // save the set rules, terms, teams, etc
      progress: [] // save an object for every round
    }
  },

  mutations: {
    resetPlayers(state) { // reset the players
      state.players = []
    },
    recentGameEnded(state){ // keep the players, reset everything else
      state.recentGame.gameId = null
      state.recentGame.setup = {}
      state.recentGame.progress = []
    },
    
    addPlayer(state, newPlayer) {
      state.players.push(newPlayer)
    },
    removePlayer(state, nameToRemove) {
      state.players = state.players.filter(function (playerName) {
        return playerName != nameToRemove
      });
    },
    updatePlayers(state, newPlayers){
      state.players = newPlayers
    },
    shufflePlayers(state){
      //state.players = state.players
    },
    

    updateSetup(state, newSetup){
      state.recentGame.setup = newSetup
    },


    addToProgress(state, newInfo){
      state.recentGame.progress.push(newInfo)
    },
  },

  getters: {
    getPlayers: state => state.players,
    getRecentGame: state => state.recentGame,
  },

  actions: {
  },
  modules: {
  }
})
