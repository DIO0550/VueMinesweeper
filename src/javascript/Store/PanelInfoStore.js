const state = {
    column: 5,
    row: 5,
    bomb_count: 5,
}

const mutations = {
    setColumn(state, payload) {
        state.column = payload;
    },
    setRow(state, payload) {
        state.row = payload;
    },
    setBombCount(state, payload) {
        state.bomb_count = payload;
    }
}

const getters = {
    column(state) {
        return state.column;
    },
    row(state) {
        return state.row;
    },
    bombCount(state) {
        return state.bomb_count;
    }
}
const actions = {
    setColumn({ commit }, data) {
        commit("setColumn", data);
    },
    column({ commit }) {
        commit("colmun");
    },
    setRow({ commit }, data) {
        commit("setRow", data);
    },
    row({ commit }) {
        commit("row");
    },
    setBombCount({ commit }, data) {
        commit("setBombCount", data);
    },
    bombCount({ commit }) {
        commit("bombCount");
    },
}

const panel_info_store = {
    state,
    mutations,
    getters,
    actions,
    namespaced:true,
}

export default panel_info_store;
