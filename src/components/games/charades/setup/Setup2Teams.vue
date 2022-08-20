<template>
        <div class="setup-teams">
            <h3 class="text-center mb-3">Assign teams</h3>
            <v-row 
                v-for="(player,id) in players"
                :key=id
                :class="[player.team == 1 ? 'team-1' : 'team-2', 'playerRow', 'my-2']"
                @click="$emit('changeTeam', id)"
            >   
                <div :class="[player.team == 1 ? 'getSquished' : 'pushAway']"></div>
                <div
                    class="playerBox"
                >
                    {{player.name}}
                    <v-icon
                        small
                        color="grey lighten-1"
                        @click="$emit('removePlayer', id)"
                    >
                    mdi-close
                    </v-icon>
                </div>
                <div :class="[player.team == 1 ? 'pushAway' : 'getSquished']"></div>
            </v-row>
            
            <v-row class="mx-4">
                <v-text-field
                    placeholder="New Player"
                    clearable
                    color="success"
                    append-icon="mdi-plus"
                    v-model="newPlayerInput"
                    @click:append="addPlayer"
                    @keyup.enter="addPlayer"
                    @input="error_msg=''"
                    class="mt-4"
                ></v-text-field>
        <p v-if="newPlayerInput" class="error--text text-center">{{error_msg}}</p>

            </v-row>
        </div>
</template>

<script>

export default {
    name: 'SetupCharades',
    props: [
        'players'
    ],
    data(){
        return{
            error_msg: '',
            newPlayerInput: '',
        }
    },
    methods: {
        addPlayer(){
            if (this.players.includes(this.newPlayerInput)){
                this.error_msg = "This name is already taken, dipshit!"
            } else if (this.newPlayerInput.length < 2){
                this.error_msg = "That name's is a little short, innit?"
            }  else {
                this.$emit('addPlayer', this.newPlayerInput);
                this.newPlayerInput = ""
                this.error_msg = ""
                }

        },
    },

    mounted(){
    }

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