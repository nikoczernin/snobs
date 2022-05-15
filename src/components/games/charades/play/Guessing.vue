<template>
    <div class="rounded-lg px-8 py-6 text-center floating">
        <h3 :class="currentTurnTeam == '1' ? 'team1text' : 'team2text'">{{currentPlayer}}</h3>
        <h1  class="term">{{currentTerm}}</h1>
        <v-row class="justify-space-around my-6 mx-5">
            <div 
                class="roundButton error"
                @click="$emit('termPassed')"
                >
                <v-icon x-large color="white">mdi-close</v-icon>
            </div>
            <div 
                class="roundButton success"
                @click="$emit('termGuessed')"
            >
                <v-icon x-large color="white">mdi-check</v-icon>
            </div>
        </v-row>
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
        currentTerm: String,
    }
}
</script>


<style scoped>
/*clamp(minimum, optimum, maximum) */
    .term{
        font-size: calc(3vw + 2rem);
    }

    .roundButton{
        padding: 10px;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        align-content: center;
    }

    .center{
        transform: scale(0.8);
    }

</style>