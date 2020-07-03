import request from '@/utils/request'

export function getAppDetail(data) {
  return request({
    url: '/vue-admin-template/appDetail/getAppDetail',
    method: 'post',
    data
  })
}