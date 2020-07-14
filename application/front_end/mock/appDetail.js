const appLists = {
  admin: {
    apps: [
      {
        type: 'Website',
        appToken: '123456'
      }, {
        type: 'Website',
        appToken: '222222'
      }
    ]
  },
  editor: {
    apps: [
      {
        type: 'Website',
        appToken: '333333'
      }, {
        type: 'Wechat Mini-Program',
        appToken: '444444'
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
