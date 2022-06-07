<template>
        <div>
            <!--
            <div>
                {{totalScoresPerTeam}} 
            </div>
            <div>
                {{scoresPerTeam}}
            </div>
            -->
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
            <v-row>
                <LineGraph
                    :data="totalScoresPerTeam"
                    :pointSize=3
                    :showXLabs=true
                    :showYLabs=true
                    class="mb-3"
                    />
            </v-row>
        </div>

</template>

<script>
//:class="scores.team1 < scores.team2 ? 'flex-grow-3' : 'flex-shrink-1'"

import LineGraph from './LineGraph.vue'

export default {
    name: 'Scoreboard',
    components: {
        LineGraph
    },
    props: {
            progress: Array,
        },

    data(){
        return {
            loaded: false,
            scoresPerTeam: [[],[]],
            score1: 0,
            score2: 0,
            totalScoresPerTeam: [
                {
                    name: 'Team 1',
                    data: [0]
                },
                {
                    name: 'Team 2',
                    data: [0]
                },
            ],            
        }
    },
    methods: {
        sum(arr){
            var sum = arr.reduce(function(a, b){
                return a + b;
            }, 0);
            return sum;
        },
        getScoresPerTeam(){
            for (let i=0; i < this.progress.length; i++) {
                var turn = this.progress[i]
                this.scoresPerTeam[turn.team - 1].push(turn.points)
            }
        },
        getTotalScoresPerRound(){
            for (let team=0; team < 2; team++) {
                for (let round=0; round < this.scoresPerTeam[0].length; round++) {
                    // take the score of round i of each team
                    let newScore = this.scoresPerTeam[team][round]
                    // add it to the total score up until round i of each team
                    let previousScore = this.totalScoresPerTeam[team].data[round]
                    let totalScore = newScore + previousScore
                    // push both values in an array to the totalScoresPerRound
                    this.totalScoresPerTeam[team].data.push(totalScore)
                }
            }
            this.score1 = this.sum(this.scoresPerTeam[0])
            this.score2 = this.sum(this.scoresPerTeam[1])
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