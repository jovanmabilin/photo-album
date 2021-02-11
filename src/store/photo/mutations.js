export function getPhotoList (state, payload) {
  state.photoList = payload
}

export function addPhoto (state, payload) {
  const id = state.photoList.length ? state.photoList[state.photoList.length - 1].id + 1 : 0;
  state.photoList.push({
    id: id,
    albumId: payload.albumId || 0,
    title: payload.title,
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355"
  })
}

export function deletePhoto (state, payload) {
  const selectedIndex = state.photoList.findIndex(item => item.id === payload.id);
  if ( selectedIndex > -1 ) {
    state.photoList.splice(selectedIndex, 1);
  }
}

export function updatePhoto (state, payload) {
  const selectedIndex = state.photoList.findIndex(item => item.id === payload.id);
  if ( selectedIndex > -1 ) {
    state.photoList[selectedIndex].title = payload.title
  }
}

