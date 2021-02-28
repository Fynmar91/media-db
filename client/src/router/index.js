import { createWebHistory, createRouter } from "vue-router";
import Menu from "@/views/Menu.vue";
import List from "@/views/List.vue";
import Media from "@/views/Media.vue";
import Add from "@/views/Add.vue";
import Log from "@/views/Log.vue";

const routes = [
  {
    name: "Menu",
    path: "/",
    component: Menu,
  },
  {
    name: "List",
    path: "/list/:type",
    component: List,
    props: true,
  },
  {
    name: "Media",
    path: "/media/:id",
    component: Media,
    props: true,
  },
  {
    name: "Add",
    path: "/add/:type",
    component: Add,
    props: true,
  },
  {
    name: "Log",
    path: "/log/",
    component: Log,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
