import { httpRequest } from '../../boot/axios'


export function getPhotoList () {
  return httpRequest.get('photos')
}

export function addPhoto (params) {
  return httpRequest.post('photos', params)
}

export function updatePhoto (params) {
  return httpRequest.put(`photos/${params.id}`, params.data)
}


export function deletePhoto (params) {
  return httpRequest.delete(`photos/${params.id}`)
}