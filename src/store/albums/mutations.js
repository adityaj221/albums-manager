export const setActive = (state, albumId) => {
  state.activeAlbumId = albumId
}
export const updateList = (state, list) => {
  state.list = list
}
export const updateEditItem = (state, val) => {
  state.showEdit = (val === true)
}
