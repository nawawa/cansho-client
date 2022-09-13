<template>
  <v-app>
    
    <v-app-bar
      fixed
      app
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
