import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Rank from '../components/rank/rank';
import Recommend from '../components/recommend/recommend';
import Search from '../components/search/search';
import Singer from '../components/singer/singer';
import Disc from '../components/disc/disc';
import RankDetail from '../components/rank-detail/rank-detail';
import SingerDetail from '../components/singer-detail/singer-detail'; 


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Disc
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: ':id',
        component: RankDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
  //   children: [
  //     {
  //       path: ':id',
  //       component: SingerDetail
  //     }
  //   ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
