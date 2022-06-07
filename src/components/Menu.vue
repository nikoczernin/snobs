<template>
    <v-navigation-drawer
        v-if="menuOpen"
        width="100%"
        permanent
        class="menu"
        >
            <v-list>
                <v-list-item
                    v-for="item in items"
                    :key="id"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return{
            items: [
                {
                    title: "Players",
                    icon: "mdi-view-dashboard",
                },
                {
                    title: "Rules",
                    icon: "mdi-view-dashboard",
                },
                {
                    title: "Teams",
                    icon: "mdi-view-dashboard",
                },
                {
                    title: "Terms",
                    icon: "mdi-view-dashboard",
                },
            ]
        }
    },
    props: {
        menuOpen: Boolean
    },
    mounted(){
        console.log(this.menuOpen)
    }
}
</script>

<style scoped>
    .menu, v-navigation-drawer {
        background: var(--v-background-darken1);
        background: red;

    }
</style>