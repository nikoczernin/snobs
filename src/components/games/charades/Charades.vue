<template>
    <div>
        <router-view
        :recentGame="recentGame" 
            @startGame="startGame"
            @addToProgress="addToProgress"
            @gameOver="gameOver"
        :players="players" 
            @addPlayer="addPlayer"
            @assignTeam="assignTeam"
            @removePlayer="removePlayer"
        />
    </div>
</template>

<script>
export default {
    name: 'Charades',
    props: [
        "players", 
        'recentGame'
    ],
    methods: {
        startGame(setup){
            this.$emit('updateSetup', setup)
        },
        addToProgress(newInfo){
            this.$emit('addToProgress', newInfo)
        },
        gameOver(){
            this.$emit('gameOver')
        },
        addPlayer(newPlayerInput){
            this.$emit('addPlayer', newPlayerInput);
        },
        assignTeam(playerIndex, team){
            this.$emit('assignTeam', playerIndex, team);
        },
        removePlayer(id){
            this.$emit('removePlayer', id);
        },



    },

    
    
}
</script>