<template>
    <div class="small-box rounded-xl pa-4">
        <v-card
            color="background lighten-0"
            elevation="0"
            class="rounded-xl text-center"
        >
            <h3 class="text-center mb-3">Enter terms to guess</h3>

            <div class="d-flex flex-wrap">
                <div
                    v-for="(player, id) in players"
                    :key=id
                    v-show="terms.map(x => x[1]).filter(name => name == player).length < 3"
                    :class="['player-selection',selectedPlayer == id ? 'isSelected' : '', 'px-3', 'py-2', 'ma-1']"
                    @click="selectPlayer(id)"
                >
                    {{player}}
                </div>
            </div>

            <v-text-field
                placeholder= "New Term"
                
                color="secondary darken-1"
                class="my-2"
                v-model="newTerm"
                @keydown.enter="submitTerm"
            ></v-text-field>
            <v-btn
                elevation="0"
                class="rounded-lg"
                color="secondary darken-1"
                @click="submitTerm"
                :disabled="!newTerm || terms.map(x=>x[1]).filter(name=>name==players[selectedPlayer]).length>=3"
            >Submit</v-btn>
        </v-card>

            <!-- Display a snackbar message whena term is added-->
            <v-snackbar
                v-model="snackbar"
                timeout=2000
                >
                {{ snackbarText }}
            </v-snackbar>

        
    </div>
</template>

<script>

export default {
    props: {
        terms: Array,
        termsPerPlayer: Number,
        players: Array,
    },
    data(){
        return {
            selectedPlayer: 0,
            newTerm: "",
            playersFiltered: [],

            snackbar: false,
            snackbarText: 'New term added.',

        }
    },

    methods: {
        selectPlayer(id){
            this.selectedPlayer = id
        },

        submitTerm(){
            this.$emit('submitTerm', [this.newTerm, this.players[this.selectedPlayer]])
            this.termPlayer = null
            this.newTerm = "" 
            this.snackbar = true
        }
    }
}
</script>

<style scoped>
    .player-selection{
        background: var(--v-background-base);
        border-radius: 15px;
        transition: all .2s;
        line-height: 1.2em;
        box-shadow: 
            inset 5px 5px 10px var(--v-background-darken1),
            inset -5px -5px 10px var(--v-background-lighten1)
            ;
    }
    .isSelected {
        background: var(--v-secondary-darken1);
        color: white;
        box-shadow: 0px 0px 20px var(--v-secondary-lighten1)
    }
</style>