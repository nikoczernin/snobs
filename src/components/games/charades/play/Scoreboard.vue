<template>
        <v-row class="scoreboard mt-2 mb-5 flex-nowrap">
            <v-col
            class=" flex-shrink-1 "
            >
                <div class="scoreBlock team1 rounded-pill">{{scores.team1}}</div>
            </v-col>
            <v-col
            class=" flex-shrink-1 "
            >
                <div class="scoreBlock team2 rounded-pill">{{scores.team2}}</div>
            </v-col>
        </v-row>
</template>

<script>
export default {
    name: 'Scoreboard',

    data(){
        return {

        }
    },
    props: {
        scores: Object,
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