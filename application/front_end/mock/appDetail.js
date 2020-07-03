const appLists = {
  admin: {
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
  editor: {
    apps: [
      {
        type: 'web',
        appId: '333333'
      }, {
        type: 'web',
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
