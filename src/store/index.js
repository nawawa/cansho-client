export const actions = {
  async nuxtServerInit({state}, { app }) {

    await app.$axios
      .$get('/user')
      .then((authUser) => {
        app.$auth.setUser(authUser)
      })
      .catch((err) => {
        app.$auth.setUser(null)
      })

  }
}