import { login, logout, getInfo, register } from '@/api/user'
import { updateAppDetail } from '@/api/appDetail'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    username: '',
    appList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_APPLIST: (state, appList) => {
    state.appList = appList
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response

        sessionStorage.setItem('username', username)
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('avatar', data.avator)

        commit('SET_USERNAME', username)
        commit('SET_TOKEN', data.token)
        commit('SET_AVATAR', data.avator)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // register
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password }).then(response => {
        const { data } = response

        sessionStorage.setItem('username', username)
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('avatar', data.avator)

        commit('SET_USERNAME', username)
        commit('SET_TOKEN', data.token)
        commit('SET_AVATAR', data.avator)

        // commit('SET_APPLIST', appList)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        var { data, appList } = response

        if (!appList) {
          appList = []
        }
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name } = data

        sessionStorage.setItem('name', name)
        sessionStorage.setItem('appList', JSON.stringify(appList))
        commit('SET_NAME', name)
        commit('SET_APPLIST', appList)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // update app
  updateApp({ commit, state }, appItem) {
    return new Promise((resolve, reject) => {
      var store_appList = state.appList

      if (!store_appList) { store_appList = [] }

      store_appList.push(appItem)
      sessionStorage.setItem('appList', JSON.stringify(store_appList))
      var post_appList = { token: state.token, ...appItem }

      updateAppDetail(post_appList).then(res => {
        resolve('add OK')
      }).catch(error => {
        console.log(error)
        reject('something wrong')
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

