<template>
        <div class="setup-teams">
            <h3 class="text-center mb-3">Assign teams</h3>
            <v-row 
                v-for="(player,id) in playersTeams"
                :key=id
                :class="[player.team == 1 ? 'team-1' : 'team-2', 'playerRow', 'my-2']"
                @click="$emit('changeTeam', id)"
            >   
                <div :class="[player.team == 1 ? 'getSquished' : 'pushAway']"></div>
                <div
                class="playerBox">
                    {{player.name}}
                </div>
                <div :class="[player.team == 1 ? 'pushAway' : 'getSquished']"></div>
            </v-row>
        </div>
</template>

<script>

export default {
    name: 'SetupCharades',
    props: [
        'playersTeams'
    ]
}
</script>

<style scoped>

    .playerRow{
        margin: 5px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        transition: all .9s ;
}

    .playerBox{
        padding: 8px 0px ;
        border-radius: 10px;
        flex: auto;
        text-align: center;
        
        background-color: var(--v-background-lighten2);

        box-shadow: inset 0px -3px 5px var(--v-background-base);

        transition: padding .3s;
    }

    .playerBox:hover {
        padding: 8px 3px;
    }

    .getSquished {
        flex: 0;
        transition: flex .7s ease-in-out;
    }

    .pushAway {
        flex: 12;
        transition: flex .7s ease-in-out;
    }


    .team-1 {
        background-color: var(--v-primary-lighten1);
        box-shadow: 
        inset 8px 8px 10px var(--v-primary-darken1)
        ;
    }

    .team-2 {
        background-color: var(--v-secondary-base);
        box-shadow: 
        inset 8px 8px 10px var(--v-secondary-darken1)
;
    }

    .changeTeam-enter-active, .changeTeam-leave-active {
        transition: all 0.2s ease-in;
    }
</style>