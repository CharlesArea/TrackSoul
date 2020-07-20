import request from '@/utils/request'

export function updateAppDetail(data) {
  return request({
    url: '/appDetail/updateAppList',
    method: 'post',
    // headers: {'Content-Type': 'multipart/form-data' },
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

export function getUserCount(data) {
  return request({
    url: '/appDetail/getUserCount',
    method: 'post',
    data
  })
}

export function getTrackRequest(data) {
  return request({
    url: '/appDetail/getTrackRequest',
    method: 'post',
    data
  })
}

export function getClickEventFiltDate(data) {
  return request({
    url: '/appDetail/getClickEventFiltDate',
    method: 'post',
    data
  })
}