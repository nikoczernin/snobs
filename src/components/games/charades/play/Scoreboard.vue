<template>
        <div>
            {{totalScoresPerRound}} lol
            <v-row class="scoreboard mt-2 mb-5 flex-nowrap">
                <v-col
                :class="loaded & score1 > score2 ? 'big' : 'small'"
                >
                    <div class="scoreBlock team1 rounded-pill">{{score1}}</div>
                </v-col>
                <v-col
                :class="loaded & score1 < score2 ? 'big' : 'small'"
                >
                    <div class="scoreBlock team2 rounded-pill">{{score2}}</div>
                </v-col>
            </v-row>
        </div>

</template>

<script>
//:class="scores.team1 < scores.team2 ? 'flex-grow-3' : 'flex-shrink-1'"
export default {
    name: 'Scoreboard',
    
    props: {
            progress: Array,
        },

    data(){
        return {
            loaded: false,
            scoresPerTeam: [[],[]],
            score1: 0,
            score2: 0,
            totalScoresPerRound: [[0, 0]],            
        }
    },
    methods: {
        getScoresPerTeam(){
            for (let i=0; i < this.progress.length; i++) {
                var turn = this.progress[i]
                this.scoresPerTeam[turn.team - 1].push(turn.points)
            }
        },
        getTotalScoresPerRound(){
            for (let i=0; i < this.scoresPerTeam[0].length; i++) {
                // take the score of round i of each team
                let score1_n = this.scoresPerTeam[0][i]
                let score2_n = this.scoresPerTeam[1][i]
                // add it to the total score up until round i of each team
                let score1_p = this.totalScoresPerRound[i][0]
                let score2_p = this.totalScoresPerRound[i][1]
                // push both values in an array to the totalScoresPerRound
                this.totalScoresPerRound.push([score1_n+score1_p, score2_n+score2_p])
            }
            // reassign the series data
            //this.options.series[0].data = this.totalScoresPerRound
            // save the current total scores of each team
            let currentScore = this.totalScoresPerRound[1]
            this.score1 = currentScore[0]
            this.score2 = currentScore[1]
        },
    },
    mounted(){
        console.log("Start")
        // i created this flag to add the classes after the page is loaded
        // so that the flex property could be animated
        this.loaded = true;
        // make an array with the scores earned by each team for each round and put that in a bigger array
        this.getScoresPerTeam()
        this.getTotalScoresPerRound()
    },
}
</script>


<style scoped>

.scoreBlock{
    height: 50px;
    color: rgba(255,255,255,0.5);
    overflow: hidden;
    font-size: 2.6em;
    align-items: center;
    display: flex;
    justify-content: center;
    flex: 1;
    transition: flex .8s ease-in-out;

}

.team1{
    background: var(--v-primary-base);
    box-shadow: inset 5px 5px 8px var(--v-primary-darken1);
}

.team2{
    background: var(--v-secondary-base);
    box-shadow: inset 5px 5px 8px var(--v-secondary-darken1);
}

.big {
    flex: 10;
}
.small {
    flex: 6;
}

</style>