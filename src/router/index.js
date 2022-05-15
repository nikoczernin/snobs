import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Games from '../components/games/Games.vue'
import Charades from '../components/games/charades/Charades.vue'
import CharadesPlay from '../components/games/charades/play/CharadesPlay.vue'
import CharadesSetup from '../components/games/charades/setup/CharadesSetup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/games',
    name: 'Games',
    component: Games,
  },
  {
    path: '/charades',
    name: 'Charades',
    component: Charades,
    children: [
      {
        path: 'play',
        component: CharadesPlay
      },
      {
        path: 'setup',
        name: 'CharadesSetup',
        component: CharadesSetup
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
