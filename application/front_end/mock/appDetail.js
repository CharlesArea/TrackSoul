const appLists = {
  admin: {
    apps: [
      {
        type: 'Website',
        appId: '123456'
      }, {
        type: 'Website',
        appId: '222222'
      }
    ]
  },
  editor: {
    apps: [
      {
        type: 'Website',
        appId: '333333'
      }, {
        type: 'Wechat Mini-Program',
        appId: '444444'
      }
    ]
  }
}

export default [
  // user login
  {
    url: '/vue-admin-template/appDetail/getAppDetail',
    type: 'post',
    response: config => {
      const { username } = config.body
      const appList = appLists[username]
      // mock error
      if (!token) {
        return {
          status_code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        status_code: 200,
        appList: appList
      }
    }
  }
]
