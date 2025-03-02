import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AdminLayout from "../layouts/AdminLayout.vue"; 
import Authors from "../views/Authors.vue";
import Blogs from "../views/Posts.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "authors", component: Authors },
      { path: "posts", component: Blogs },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/");
  } else {
    next(); 
  }
});

export default router;
