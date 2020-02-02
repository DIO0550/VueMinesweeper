import Vue from "vue"
import Vuex from "vuex"
import PanelInfoStore from "./PanelInfoStore"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        panel_info_store:PanelInfoStore
    },
    plugins: [createPersistedState()]
})