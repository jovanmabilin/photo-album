import { httpRequest } from '../../boot/axios'


export function getAlbumList () {
  return httpRequest.get('albums')
}

export function getAlbum (params) {
  return httpRequest.get(`albums/${encodeURIComponent(params.id)}`)
}

export function addAlbum (params) {
  return httpRequest.post('albums', params)
}

export function updateAlbum (params) {
  return httpRequest.put(`albums/${encodeURIComponent(params.id)}`, params.data)
}

export function deleteAlbum (params) {
  return httpRequest.delete(`albums/${encodeURIComponent(params.id)}`)
}