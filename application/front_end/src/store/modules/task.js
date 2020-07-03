const state = {
  task_files: [],
  keywords: []
}

const mutations = {
  SET_TASK_FILES: (state, task_files) => {
    state.task_files = task_files
  },
  SET_KEYWORDS: (state, keywords) => {
    state.keywords = keywords
  }
}

const actions = {
  setTaskFiles: ({ commit }, task_files) => {
    commit('SET_TASK_FILES', task_files)
  },
  setKeywords: ({ commit }, keywords) => {
    commit('SET_KEYWORDS', keywords)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
