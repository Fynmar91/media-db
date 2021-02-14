import { createWebHistory, createRouter } from "vue-router";
import Menu from "@/views/Menu.vue";
import List from "@/views/List.vue";
import Media from "@/views/Media.vue";

const routes = [
  {
    name: "Menu",
    path: "/",
    component: Menu,
  },
  {
    name: "List",
    path: "/list",
    component: List,
  },
  {
    name: "Media",
    path: "/media/:id",
    component: Media,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
