<template>
    <div class="small-box rounded-xl pa-6">
        <div v-if="!players.length" class="grey--text">No players entered yet</div>
        
        <div 
        v-for="(player, id) in players" 
        :key=id 
        class="d-flex justify-space-between"
        >
            {{player}}
            <v-icon 
                right 
                small
                @click="$emit('removePlayer', player)"
            >mdi-close</v-icon>
        </div>

        <v-text-field
            placeholder="New Player"
            clearable
            color="success"
            append-icon="mdi-plus"
            v-model="newPlayerInput"
            @click:append="addPlayer"
            @keyup.enter="addPlayer"
            @input="error_msg=''"
        ></v-text-field>
        <p v-if="newPlayerInput" class="error--text text-center">{{error_msg}}</p>
        
    </div>
</template>

<script>
export default {
    name: "PlayersManager",
    data(){
        return{
            error_msg: '',
            newPlayerInput: '',
        }
    },
    props:[
        "players"
    ],
    
    methods: {
        addPlayer(){
            if (this.players.includes(this.newPlayerInput)){
                this.error_msg = "This name is already taken, dipshit!"
            } else if (this.newPlayerInput.length < 2){
                this.error_msg = "That name's is a little short, innit?"
            } else {
                this.$emit('addPlayer', this.newPlayerInput);
                this.newPlayerInput = ""
                this.error_msg = ""
                }

        },
    }
}
</script>