<template>
        <v-row class="scoreboard mt-2 mb-5 flex-nowrap">
            <v-col
            :class="loaded & scores.team1 > scores.team2 ? 'big' : 'small'"
            >
                <div class="scoreBlock team1 rounded-pill">{{scores.team1}}</div>
            </v-col>
            <v-col
            :class="loaded & scores.team1 < scores.team2 ? 'big' : 'small'"
            class=" flex-shrink-1 "
            >
                <div class="scoreBlock team2 rounded-pill">{{scores.team2}}</div>
            </v-col>
        </v-row>
</template>

<script>
//:class="scores.team1 < scores.team2 ? 'flex-grow-3' : 'flex-shrink-1'"
export default {
    name: 'Scoreboard',

    data(){
        return {
            loaded: Boolean,
        }
    },
    props: {
        scores: Object,
    },
    mounted(){
        // i created this flag to add the classes after the page is loaded
        // so that the flex property could be animated
        this.loaded = true;
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