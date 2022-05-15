<template>
    <div class="rounded-lg px-4 py-6 text-center floating">
        <h1>{{currentRound.text}}</h1>
        <p>{{currentRound.explanation}}</p>
        <div>
            <img 
                src="../../../../images/icons/describe.svg" 
                alt=""
                class="roundIcon "
                >
        </div>
        <v-btn 
        color="success" 
        elevation=0
        @click="$emit('startRound')"
        >Start Round</v-btn>
    </div>
</template>

<script>
export default {
    name: 'StartRound',

    data(){
        return {
            
        }
    },
    props: {
        currentRound: Object,
    }
}
</script>


<style scoped>
.roundIcon{
    max-width: 70%;
    fill: red;
    margin: 10px 0px;
}
</style>