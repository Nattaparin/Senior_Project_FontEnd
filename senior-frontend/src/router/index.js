import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/ProfileView.vue'
import ReciveView from '../views/ReciveView.vue'
import EventCard from '../views/EventCardView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import AuthService from '@/services/AuthService'
import GStore from '@/store'
import EventCardView from '@/views/EventCardView'
import GenToken from '@/views/GenToken'
import ProfileMec from '@/views/ProfileViewMec'
import profileUser from '@/views/ProfileViewUser'
// import RequestToken from '@/views/RequestToken'
import Repair from '@/views/RepairTacking'

// import { object } from 'yup'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Repair/:id',
    name: 'Repair',
    component: Repair,
    prop: true,
    beforeEnter: (to) => {
      console.log(to.params.id)
      GStore.caseDetail = GStore.caseList.filter(
        (itemInArray) => itemInArray.id == to.params.id
      )
      console.log(GStore.caseDetail)
    }
  },
  { path: '/:pathMatch(.*)*', redirect: '/Repair' },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  { path: '/:pathMatch(.*)*', redirect: '/sign-up' },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  { path: '/:pathMatch(.*)*', redirect: '/profile' },
  {
    path: '/profileMec',
    name: 'profileMec',
    component: ProfileMec
  },
  { path: '/:pathMatch(.*)*', redirect: '/profileMec' },
  {
    path: '/profileUser',
    name: 'profileUser',
    component: profileUser
  },
  { path: '/:pathMatch(.*)*', redirect: '/profileUser' },
  {
    path: '/receive-case',
    name: 'receive-cese',
    component: ReciveView
  },
  { path: '/:pathMatch(.*)*', redirect: '/receive-case' },
  {
    path: '/event-card',
    name: 'event-card',
    component: EventCard,
    beforeEnter: () => {
      AuthService.get_case()
    }
  },
  { path: '/:pathMatch(.*)*', redirect: '/event-card' },
  {
    path: '/info-card/:id',
    name: 'EventDetailView',
    component: EventDetailView,
    prop: true,
    beforeEnter: (to) => {
      console.log(to.params.id)
      GStore.caseDetail = GStore.caseList.filter(
        (itemInArray) => itemInArray.id == to.params.id
      )
      console.log(GStore.caseDetail)
    }
  },
  {
    path: '/info-card/event-card',
    name: 'event-card-details',
    component: EventCardView
  },
  { path: '/:pathMatch(.*)*', redirect: '/event-card' },
  {
    path: '/GenToken',
    name: 'GenToken',
    component: GenToken
  },
  { path: '/:pathMatch(.*)*', redirect: '/GenToken' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
