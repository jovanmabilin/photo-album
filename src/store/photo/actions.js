import * as httpRequest from '../../api/photo'

export function getPhotoList ({ commit }) {
  const request = httpRequest.getPhotoList()

  request.then(res => {
    commit('getPhotoList', res.data)
  })

  return request
}

export function addPhoto ({ commit }, params) {
  commit('addPhoto', params)
}

export function updatePhoto ({ commit }, params) {
  commit('updatePhoto', params)
}


export function deletePhoto ({ commit }, params) {
  commit('deletePhoto', params)
}
