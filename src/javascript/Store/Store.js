import Vue from "vue"
import Vuex from "vuex"
import ContactsStore from "./contacts_store"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        ContactsStore:ContactsStore
    }
})