import * as httpRequest from '../../api/user'

export function getUserList ({ dispatch, commit }) {
  const request = httpRequest.getUserList()

  request.then(res => {
    commit('getUserList', res.data)
    dispatch('getUser', res.data[0])
  })

  return request
}

export function getUser ({ commit }, params) {
  commit('getUser', params)
}

