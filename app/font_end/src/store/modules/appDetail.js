const getDefaultState = () => {
  return {
    barItem: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_BARITEM: (state, barItem) => {
    state.barItem = barItem
  }
}

const actions = {
  set_barItem({ commit }, barItem) {
    commit('SET_BARITEM', barItem)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

