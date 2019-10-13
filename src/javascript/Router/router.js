import Title from "../../component/Title.vue";
import AddressBookCotanctEdit from "../../component/Game.vue";
import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/Game",
        name: "Game",
        component: AddressBookCotanctEdit,
        props: true
    },
    {
        path: "/",
        name: "Title",
        component: AddressBookContactList,
        props: true
    }
];

const router = new VueRouter({
    routes
})

export default router;