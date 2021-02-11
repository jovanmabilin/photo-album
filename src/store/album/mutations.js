export function getAlbumList (state, payload) {
  state.albumList = payload
}

export function addAlbum (state, payload) {
  const id = state.albumList.length ? state.albumList[state.albumList.length - 1].id + 1 : 0;
  state.albumList.push({
    id: id,
    userId: payload.userId || 0,
    title: payload.title
  })
}

export function getAlbum (state, payload) {
  state.albumInfo = payload
}

export function deleteAlbum (state, payload) {
  const selectedIndex = state.albumList.findIndex(item => item.id === payload.id);
  if ( selectedIndex > -1 ) {
    state.albumList.splice(selectedIndex, 1);
  }
}

export function updateAlbum (state, payload) {
  const selectedIndex = state.albumList.findIndex(item => item.id === payload.id);
  if ( selectedIndex > -1 ) {
    state.albumList[selectedIndex].title = payload.title
  }
}

