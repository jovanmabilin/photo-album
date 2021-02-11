import { httpRequest } from '../../boot/axios'

export function getUserList () {
  return httpRequest.get('users')
}

export function getUser (params) {
  return httpRequest.get(`users/${encodeURIComponent(params.id)}`)
}

