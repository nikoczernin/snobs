<template>
    <div class="rounded-lg px-8 py-6 text-center floating">
        <h4>All terms guessed</h4>
        <h2>End of round "{{currentRound.text}}"</h2>

        <Scoreboard
            :progress="progress"
        />

        <v-btn 
            elevation="0"
            @click="$emit('endRound')"
            color="success"
            >Next</v-btn>
    </div>
</template>

<script>
import Scoreboard from './Scoreboard'

export default {
    name: 'EndRound',

    data(){
        return {

        }
    },
    props: {
        scores: Object,
        currentRound: Object,
        progress: Array,
    },
    components: {
        Scoreboard
    },


    mounted(){

    }

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
}

.team1{
    background: var(--v-primary-base);
    box-shadow: inset 5px 5px 8px var(--v-primary-darken1);
}

.team2{
    background: var(--v-secondary-base);
    box-shadow: inset 5px 5px 8px var(--v-secondary-darken1);
}

</style>