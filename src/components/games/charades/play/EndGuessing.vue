<template>
    <div class="rounded-lg px-8 py-6 text-center floating">
        <h3>Time's up!</h3>
        <h1  class="term">Points made: <strong>{{points}}</strong></h1>
        
        <p class=" my-5 mx-5">
            Well done, 
            <span :class="currentTurnTeam == '1' ? 'team1text' : 'team2text'">
                <strong>
                    {{currentPlayer}}!
                </strong>
            </span>
            Your team now has <strong>{{scores["team"+currentTurnTeam]}}</strong> points.
        </p>

        <v-btn 
            elevation="0"
            @click="$emit('turnOver')"
            :class="currentTurnTeam == '1' ? 'primary' : 'secondary'"
            >Next</v-btn>
    </div>
</template>

<script>
export default {
    name: 'StartGuessing',

    data(){
        return {
            
        }
    },
    props: {
        currentTurnTeam: Number,
        currentPlayer: String,
        points: Number,
        scores: Object,
    },

}
</script>


<style scoped>

</style>