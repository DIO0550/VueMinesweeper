import Title from "../../component/Title.vue";
import Game from "../../component/Game.vue";
import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/Game",
        name: "Game",
        component: Game,
        props: true
    },
    {
        path: "/",
        name: "Title",
        component: Title,
        props: true
    }
];

const router = new VueRouter({
    routes
})

export default router;