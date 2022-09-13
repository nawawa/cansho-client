<template>
  <div>
    <v-form>
      <v-text-field 
        label="ログインID" v-model="loginId"
      />
      <v-text-field 
        label="パスワード" 
        v-model="password"
        @click:append="showPassword = !showPassword" 
        v-bind:type="showPassword ? 'text' : 'password'"
        append-icon="mdi-eye-off" 
      />
    </v-form>
    <div id="right">
      <v-btn @click="login" depressed>ログイン</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    loginId: '',
    password: '',
  }),
  methods: {
    async login() {
      await this.$auth.loginWith(this.$config.AUTH_SCHEME, {
        data: { 
          loginId: this.loginId, 
          password: this.password 
        }
      })
      .then((res) => {
        this.$auth.setUser(res.data)
        this.$router.push('/')
      })
      .catch((err) => {
        this.$auth.setUser(null)
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    border-radius: 5px;
    border: 2px solid #ccc;
  }
  #right {
    text-align: right;
  }
</style>