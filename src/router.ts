import { h } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Protect from "./components/auth/protect.vue";
import Dashboard from "./pages/Dashboard.vue";
import Landing from "./pages/Landing.vue";
import Login from "./pages/Login.vue";
import NotFound from "./pages/not_found.vue";
import Signup from "./pages/Signup.vue";
import Tickets from "./pages/Tickets.vue";

const routes = [
  { path: "/", component: Landing },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/tickets",
    component: {
      render: () => h(Protect, null, () => h(Tickets)),
    },
  },
  {
    path: "/dashboard",
    component: {
      render: () => h(Protect, null, () => h(Dashboard)),
    },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
