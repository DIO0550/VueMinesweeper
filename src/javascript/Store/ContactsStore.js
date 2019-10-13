import Vue from "vue";

const state =  {
    editID: -1,
    selectedID: -1,
    contacts:[]
}

const mutations = {
    setEditID(state, payload) {
        state.editID = payload;
    },
    setContacts(state, contacts) {
        console.log("START Vuex setContacts");
        Vue.set(state,'contacts', contacts);
    },
    setSelectedID(state, selectedID) {
        state.selectedID = selectedID;
    }
}

const getters = {
    editID (state) {
        return state.editID;
    },
    contacts (state) {
        return state.contacts;
    },
    selectedID (state) {
        return state.selectedID;
    }
}

const ContactsStore = {
    state,
    mutations,
    getters
}

export default ContactsStore
