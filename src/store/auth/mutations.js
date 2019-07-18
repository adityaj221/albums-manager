export const setAuth = (state, val) => {
  if (val !== true) {
    val = false
  }
  state.signedIn = val
}
export const setUser = (state, user) => {
  state.user = user
}
