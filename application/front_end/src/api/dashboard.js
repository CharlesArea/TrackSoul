import request from '@/utils/request'

export function getDashboardData(params) {
  return request({
    url: '/dashboard_data',
    method: 'get',
    params
  })
}
