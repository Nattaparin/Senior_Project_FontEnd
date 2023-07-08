import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/ProfileView.vue";
import ReciveView from "../views/ReciveView.vue";
import EventCard from "../views/EventCardView.vue";
import InfoCard from "../views/EventDetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp,
  },
  { path: "/:pathMatch(.*)*", redirect: "/sign-up" },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  { path: "/:pathMatch(.*)*", redirect: "/profile" },
  {
    path: "/receive-case",
    name: "receive-cese",
    component: ReciveView,
  },
  { path: "/:pathMatch(.*)*", redirect: "/receive-case" },
  {
    path: "/event-card",
    name: "event-card",
    component: EventCard,
  },
  { path: "/:pathMatch(.*)*", redirect: "/event-card" },
  {
    path: "/info-card",
    name: "info-card",
    component: InfoCard,
  },
  { path: "/:pathMatch(.*)*", redirect: "/info card" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
