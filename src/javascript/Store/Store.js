import Vue from "vue"
import Vuex from "vuex"
import ContactsStore from "./ContactsStore"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        ContactsStore:ContactsStore
    }
})