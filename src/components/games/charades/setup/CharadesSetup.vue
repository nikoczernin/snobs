<template>
    <div>
        <v-row class="d-flex justify-center text-center my-2">
            <h2>Game Setup</h2>
        </v-row>
        <v-row class="d-flex align-center justify-space-around text-center my-2">
            <v-btn 
                class="" 
                color="primary" 
                @click="autoSetup" 
                elevation="0"
                v-if="recentGame.test_run"
                >Auto-Setup</v-btn>
            <v-btn 
                elevation="0"
                color="success"
                class="start-game-button"
                @click="startGame"
                :disabled="terms.length<players.length"
                >Start Game</v-btn> 
        </v-row>

        <v-row class="setupCategorySelection d-flex justify-space-around text-center my-8">
            <div 
            v-for="(category, categoryId) in setupCategories"
            :key="categoryId"
            :class="['setup-category', selectedSetupCategoriyID == categoryId ? 'setup-category-selected' : '']"
            @click="selectedSetupCategoriyID = categoryId"
            >{{category}}</div>
        </v-row>

        <transition name="fade" mode="out-in">
                <SetupRules 
                key=2
                @rulesChanged="rulesChanged"
                v-if="selectedSetupCategoriyID == 0"
                class="setup"
                />

                <Setup2Teams 
                key=1
                v-if="selectedSetupCategoriyID == 1"
                :players=players 
                @changeTeam="changeTeam"
                @addPlayer="addPlayer"
                @removePlayer="removePlayer"
                class="setup"
                />

                <SetupTerms 
                key=3
                v-if="selectedSetupCategoriyID == 2"
                :terms="terms" 
                :termsPerPlayer=3 
                :players="players" 
                @submitTerm="submitTerm"
                class="setup"
                />
        </transition>


        <div class="d-flex justify-space-around">
        </div>

    </div>
</template>

<script>
import SetupRules from './SetupRules'
import Setup2Teams from './Setup2Teams'
import SetupTerms from './SetupTerms'

export default {
    name: 'CharadesSetup',
    components: {
        SetupRules, // set the general rules of the game
        Setup2Teams, // divide the players into two teams
        SetupTerms, // let every player create some terms for the game
    },
    props: [
        'players', 
        'recentGame'
    ],
    data(){
        return{
            rules: [],
            terms: [],
            setupCategories: ['Rules', 'Teams', 'Terms'],
            selectedSetupCategoriyID: 0,
        }
    },
    mounted(){

    },

    methods: {
        changeTeam(id){
            if (this.players[id].team === 1){
                this.$emit('assignTeam', id, 2);
            } else {
                this.$emit('assignTeam', id, 1);
            }
        },
        rulesChanged(rules){
            this.rules = rules
        },

        submitTerm(newTerm){
            this.terms.push(newTerm)
        },

        addPlayer(newPlayerInput){
            this.$emit('addPlayer', newPlayerInput);
        },
        
        removePlayer(id){
            this.$emit('removePlayer', id);
        },


        startGame(){
            this.$emit('startGame', {
                players: this.players, 
                rules: this.rules, 
                terms: this.terms
                })
            this.$router.push('play')
        },

        autoSetup(){
            this.terms = [ [ "Penis", "Niko" ], [ "Hose", "Niko" ], [ "Affe", "Niko" ], [ "Kind", "Jan" ], [ "Lol", "Maximilian" ], [ "Adriano", "Doom" ], [ "Cunt", "Henry" ] ]
        }
    }
}
</script>

<style scoped>
    .setup-category {
        padding: 2px 12px;
        border-radius: 10px;
        box-shadow:  
            -4px -4px 10px var(--v-background-lighten1),
            4px 4px 10px var(--v-background-darken1)
            ;
        transition: all .5s;
    }

    .setup-category-selected {
        background: var(--v-success-base);
        border-color: var(--v-success-base);
        color: #fff;
    }


.setup{
    transition: all .2s !important;
    position: relative !important;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}

.fade-leave-active {
	 position: relative;
}


</style>