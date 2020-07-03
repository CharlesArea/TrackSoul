
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://www.clipartmax.com/png/middle/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-KBYsNEWJtQujpxfDrZvkAOGOkWeTD8TjZw&usqp=CAU',
    name: 'Normal Editor'
  }
}

const appLists = {
  'admin-token': {
    apps: [
      {
        type: 'web',
        appId: '123456'
      }, {
        type: 'web',
        appId: '222222'
      }
    ]
  },
  'editor-token': {
    apps: [
      {
        type: 'app',
        appId: '333333'
      }, {
        type: 'app',
        appId: '444444'
      }
    ]
  }
}

export default [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      // const appList = appLists[username]
      // mock error
      if (!token) {
        return {
          status_code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        status_code: 200,
        data: token,
        // appList: appList
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      const appList = appLists[token]
      // mock error
      if (!info) {
        return {
          status_code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        status_code: 200,
        data: info,
        appList: appList
      }
    }
  },
  {
    url: '/vue-admin-template/user/appList',
    type: 'get',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      const appList = appLists[username]

      // mock error
      if (!info) {
        return {
          status_code: 50008,
          message: 'Login failed, unable to get user appList.'
        }
      }

      return {
        status_code: 200,
        appList: appList
      }
    }
  },
  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        status_code: 200,
        data: 'success'
      }
    }
  }
]
