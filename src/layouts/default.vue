<template>
  <v-app 
    dark
    :style="color"
  >
    
    <v-app-bar
      fixed
      app
      flat
      :style="color"
    >
      
      <v-spacer />
      <NuxtLink 
        v-if="!isLoggedIn && !isLoginPage"
        to="/login"
      >
        ログイン
      </NuxtLink>
      <v-btn 
        v-if="isLoggedIn"
        depressed
        @click="logout"
      >
        ログアウト
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
    isLoginPage() {
      return this.$route.name === 'login'
    },
    color() {
      return `background: ${this.$vuetify.theme.themes.dark.main}`
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$auth.setUser(null)
    }
  }
}
</script>
