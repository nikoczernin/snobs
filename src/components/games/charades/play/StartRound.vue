<template>
    <div class="rounded-lg px-4 py-6 text-center floating">
        <h1>{{currentRound.text}}</h1>
        <p>{{currentRound.explanation}}</p>
        <div>
            <img 
                :src="'../images/icons/' + currentRound.icon"
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
            icon: 'puppet.svg'
        }
    },
    props: {
        currentRound: Object,
    },

}
</script>


<style scoped>
.roundIcon{
    width: 70%;
    max-width: 300px;
    max-height: 200px;
    fill: red;
    margin: 10px;
    padding: 20px;

}
</style>