<template>
    <div>
        <router-view
        :players="players" 
        :recentGame="recentGame" 
        @startGame="startGame"
        @addToProgress="addToProgress"
        @gameOver="gameOver"
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
            console.log("Game over")
        }

    },
    
    
}
</script>