import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/ProfileView.vue";

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
