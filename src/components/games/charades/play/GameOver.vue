<template>
    <div class="rounded-lg px-4 py-6 text-center floating">
        <h2>Game over!</h2>
        <h1 v-if="winningTeam != 0">
            <span :class="[winningTeam == 1 ? 'text1' : 'text2', 'winner']">Team {{winningTeam}}</span> won!
        </h1>
        <h1 v-if="winningTeam == 0">
            It's a draw!
        </h1>
        <Scoreboard
            :progress="recentGame.progress"
        />

        <div class="teamShowcase" v-if="winningTeam > 0">
            <h3>These are the winners:</h3>
            <span
                v-for="(player,id) in winningTeamNames"
                :key=id
                >
                    <span v-if="id!=0"> – </span>
                    {{player.name}}</span>
        </div>

        <div class="mt-3">
            <v-btn
                color="success"
                elevation=0
                @click="gameOver"
            >Go back home</v-btn>
        </div>
    </div>
</template>

<script>
import Scoreboard from './Scoreboard'

export default {
    name: 'GameOver',

    data(){
        return {
            winningTeam: 0, 
            teams: [],
            winningTeamNames: []
        }
    },
    props: {
        scores: Object,
        recentGame: Object,
    },
    components: {
        Scoreboard
    },


    mounted(){
        // set the variable winningTeam
        // if its a draw, it stays at zero!
        if (this.scores.team1 > this.scores.team2){
            this.winningTeam = 1;
        }
        else if (this.scores.team1 < this.scores.team2){
            this.winningTeam = 2;
        }
        // set a list of all winners to diplay
        // this.recentGame.setup.playersTeams
        // this.teams.push(this.recentGame.setup.playersTeams.filter(player => player.team == 1))
        // this.teams.push(this.recentGame.setup.playersTeams.filter(player => player.team == 2))
        this.winningTeamNames = this.recentGame.setup.players.filter(player => player.team == this.winningTeam)
    },
    methods:{
        gameOver(){
            this.$emit('gameOver')
            this.$router.push('/');
        }
    }

}
</script>


<style scoped>




.text1{
    color: var(--v-primary-darken1);
}
.text2{
    color: var(--v-secondary-darken1);
}

.box1{
        background: var(--v-primary-base);
        box-shadow: inset 5px 5px 8px var(--v-primary-darken1);
    }

.box2{
    background: var(--v-secondary-base);
    box-shadow: inset 5px 5px 8px var(--v-secondary-darken1);
}

</style>