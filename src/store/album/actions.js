import * as httpRequest from '../../api/album'

export function getAlbumList ({ commit }) {
  const request = httpRequest.getAlbumList()

  request.then(res => {
    commit('getAlbumList', res.data)
  })

  return request
}

export function getAlbum ({ commit }, params) {
  commit('getAlbum', params)
}

export function addAlbum ({ commit }, params) {
  commit('addAlbum', params)
}

export function updateAlbum ({ commit }, params) {
  commit('updateAlbum', params)
}


export function deleteAlbum ({ commit }, params) {
  commit('deleteAlbum', params)
}
