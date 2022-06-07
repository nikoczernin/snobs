<template>
    <v-app-bar
    app
    elevation="0"
    class="justify-space-between"
    >
        <router-link tag="div" to="/" exact class="">
            <strong >Snobs</strong> — Bottoms up, oida!
        </router-link>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="$emit('menuToggle')"></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    props: {
        gameName: String
    }
}
</script>

<style scoped>
</style>