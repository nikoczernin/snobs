<template>
    <div class="rounded-lg px-4 py-6 text-center floating">
        <h2 :class="currentTurnTeam == 1 ? 'text1' : 'text2'">Team {{currentTurnTeam}}, you're up!</h2>
        <h3>It's <span :class="currentTurnTeam == '1' ? 'team1text' : 'team2text'">{{currentPlayer}}'s </span> turn.</h3>
        <p>{{currentRoundDescription}}</p>
        <v-btn 
            elevation=0 
            color=success
            @click="$emit('startGuessing')"
        >Start Guessing</v-btn>
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
        currentRoundDescription: String,
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
</style>