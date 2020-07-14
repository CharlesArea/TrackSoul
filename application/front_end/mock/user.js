
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
        type: 'Website',
        appToken: '123456',
        appName: 'topunions'
      }, {
        type: 'Website',
        appToken: '222222',
        appName: 'CharlesWeb'
      }
    ]
  },
  'editor-token': {
    apps: [
      {
        type: 'Website',
        appToken: '333333',
        appName: 'topunions'
      }, {
        type: 'Wechat Mini-Program',
        appToken: '444444',
        appName: 'wechatApps'
      }
    ]
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username].token
      const avatar = users[token.token].avatar

      if (!token) {
        return {
          status_code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        status_code: 200,
        data: {token: token, avatar: avatar},
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      const appList = appLists[token].apps
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
    url: '/user/appList',
    type: 'get',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      const appList = appLists[username].apps

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
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        status_code: 200,
        data: 'success'
      }
    }
  }
]
