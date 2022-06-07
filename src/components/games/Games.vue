<template>
    <div class="">
        <router-link
            v-for="(game, gameid) in games"
            :key=gameid
            :to= "{name: game.name  + 'Setup'}"
            @endRecentGame="$emit('endRecentGame')"
        >
            <v-row
                class="gamelist-item align-center py-2 px-8 mx-3 my-8 rounded-lg small-box"
            >
                    {{game.name}}
            </v-row>
        </router-link>

    </div>
</template>

<script>
export default {
    name: 'Games',
    data(){
        return {
            games: [
                {
                    name: "Charades",
                    url: "charades"
                },
                //{
                //    name: "Charades",
                //    url: "charades"
                //},
                //{
                //    name: "Charades",
                //    url: "charades"
                //},
            ]
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
        color: inherit !important;
    }

    .gamelist-item{
        height: 60px;
    }


</style>