import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", name: "home", component: () => import("../views/HomeView.vue") },
  { path: "/sign-in", name: "sign-in", component: () => import("../views/SignInView.vue") },
  { path: "/sign-up", name: "sign-up", component: () => import("../views/SignUpView.vue") },
  { path: "/channel/:channel_name", name: "channel", component: () => import("../views/ChannelView.vue") },
  { path: "/video/:identifier", name: "video-detail", component: () => import("../views/VideoDetail.vue"), props: true },
  { path: "/live/:identifier", name: "live-detail", component: () => import("../views/LiveDetail.vue"), props: true },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
