<template>
    <div>   
        <StartRound 
            :currentRound="recentGame.setup.rules.rounds[currentRound]"
            @startRound="startRound"
            v-if="state=='startRound'"
        
        />
        <StartGuessing
            :currentTurnTeam="currentTurnTeam"
            :currentPlayer="currentTurnTeam == 1 ? team1[team1Index] : team2[team2Index]"
            :currentRoundDescription="recentGame.setup.rules.rounds[currentRound].explanation"
            @startGuessing="startGuessing"
            v-if="state=='startGuessing'"
        />
                
        <Guessing
            :currentTurnTeam="currentTurnTeam"
            :currentPlayer="currentTurnTeam == 1 ? team1[team1Index] : team2[team2Index]"
            :currentTerm="terms[remainingTermIDS[0]]"
            :timeToGuess="timeToGuess"
            v-if="state=='guessing'"
            @termPassed="termPassed"
            @termGuessed="termGuessed"
            class="termTop"
        />
        <Guessing
            :currentTurnTeam="currentTurnTeam"
            :currentPlayer="currentTurnTeam == 1 ? team1[team1Index] : team2[team2Index]"
            :currentTerm="terms[remainingTermIDS[1]]"
            v-if="state=='guessing' && terms.length >= (currentTermIndex+2) && false"
            class="termBottom"
        />
    
        <EndGuessing
            :currentTurnTeam="currentTurnTeam"
            :currentPlayer="currentTurnTeam == 1 ? team1[team1Index] : team2[team2Index]"
            :points="pointsGained"
            :scores="scores"
            v-if="state=='endGuessing'" 
            @turnOver="turnOver"
        />

        <EndRound
            :currentRound="recentGame.setup.rules.rounds[currentRound]"
            :scores="scores"
            :progress="recentGame.progress"
            v-if="state=='endRound'" 
            @endRound="endRound"
        />

        <GameOver
            :scores="scores"
            :recentGame="recentGame"
            v-if="state=='gameOver'" 
            @gameOver="gameOver"
        />
        
    </div>
</template>
<script>

import StartRound from './StartRound.vue'
import StartGuessing from './StartGuessing'
import Guessing from './Guessing'
import EndGuessing from './EndGuessing'
import EndRound from './EndRound'
import GameOver from './GameOver'

export default {
    props: {
        recentGame: Object,
    },
    data(){
        return {
            state: 'startRound',

            team1: [],
            team2: [],
            // keep an index of the player who is explaining atm
            team1Index: 0,
            team2Index: 0,

            currentTurnTeam: 1, // which team is playing rn?
            remainingTermIDS: [],
            pointsGained: 0,

            currentRound: 0, // pantomime or whatever

            terms: [], // this terms array gets reloaded every round

            timeToGuessSetting: this.recentGame.setup.rules.settings[1].value,
            timeToGuess: null, // timer 
            timePentaltyAmount: 10,

            scores: {team1: 0, team2: 0} // one point per term

        }
    },
    components: {
        StartRound,
        StartGuessing,
        Guessing,
        EndGuessing,
        EndRound,
        GameOver
    },

    watch: {
        timeToGuess(){
            if (this.timeToGuess <= 0) {
                this.endGuessing()
            }
        }
    },
    mounted(){
        // distribute the teams now
        for(let id in this.recentGame.setup.players){
            let name = this.recentGame.setup.players[id].name
            let team = this.recentGame.setup.players[id].team
            if (team == 1){this.team1.push(name)}
            else if (team == 2){this.team2.push(name)}
            else{console.log('oida')}
        }

        // the first round should be a selected one
        for (let i = 0; i < this.recentGame.setup.rules.rounds.length; i++) {
            if (this.recentGame.setup.rules.rounds[i].value) {
                this.currentRound = i
                break
            }
        }

    },

    methods:{
        getTermsArray(){
            this.terms = [] // make it empty first
            for (let id in this.recentGame.setup.terms){
                this.terms.push(this.recentGame.setup.terms[id][0])
            }
        },

        getOrderedTermIDS(){
            return Array(this.terms.length).fill().map((element, index) => index)
        },

        startRound(){
            this.state = 'startGuessing'
            this.currentTermIndex = 0 // start with the first term
            // get the terms array
            this.getTermsArray()
            // push an array of term IDS to remainingTermIDS
            this.remainingTermIDS = this.getOrderedTermIDS()
        },
        startGuessing(){
            this.state = "guessing"
            this.pointsGained = 0
            this.timeToGuess = this.timeToGuessSetting
            // randomize the terms array
            this.remainingTermIDS = this.shuffleArray(this.remainingTermIDS)
            // start the timer
            this.interval = setInterval(() => this.timeToGuess--, 1000)
        },

        shuffleArray(arr){
            return arr.sort(() => Math.random() - 0.5)
        },

        timePentalty(team){
            let timePentalty = this.recentGame.setup.rules.settings[2].value
            this.timeToGuess = this.timeToGuess - timePentalty
        },

        //term returned
        termPassed(){
            this.timePentalty()
            // add the first element in the randomized ids to the end   
            this.remainingTermIDS.push(this.remainingTermIDS.shift())
            },

        termGuessed(){
            this.pointsGained ++ // reward
            // remove the first item of the remainingTermIDS arr
            this.remainingTermIDS.shift()
            // end the round if there are no more ids in remainingTermIDS
            if (this.remainingTermIDS.length < 1) {
                this.endGuessing()
            }
        },

        endGuessing(){
            this.state = "endGuessing"
            clearInterval(this.interval) // stop the timer
            this.scores["team" + this.currentTurnTeam] = this.scores["team" + this.currentTurnTeam] + this.pointsGained
            
            // log the game's new progress
            let newInfo = {
                "round": this.currentRound,
                "team": this.currentTurnTeam,
                "points": this.pointsGained
            }
            this.$emit('addToProgress', newInfo)
        },
        
        // increment the teamIndex so that the next person can play
        nextPlayersTurn(){
            if (this.currentTurnTeam - 1) {
                this.team2Index =  (this.team2Index + 1) % this.team2.length
            } else {
                this.team1Index = (this.team1Index + 1) % this.team1.length
            }
        },

        nextTeamsTurn(){
            if(this.currentTurnTeam-1){this.currentTurnTeam=1}
            else{this.currentTurnTeam=2}
        },

        turnOver(){
            this.nextPlayersTurn()
            this.nextTeamsTurn()
            if (this.remainingTermIDS.length > 0){
                this.state = 'startGuessing'
            }
            // round is over
            else {
                this.state = 'endRound'
            }
        },

        endRound(){
            // check if there are still rounds to be played
            while ((this.currentRound + 1) < this.recentGame.setup.rules.rounds.length) {
                this.currentRound++
                if (this.recentGame.setup.rules.rounds[this.currentRound].value) {
                    this.state = 'startRound'
                    return
                }
            }
            this.state = 'gameOver'
        },

        gameOver(){
            this.$emit("gameOver")
        }

    },
}
</script>

<style scoped>
.fade-enter, .fade-leave-to {
	opacity: 0;
}

.fade-leave-active {
	 position: relative;
}



</style>