<template>
  <div id="menu-list-wrapper">
    <v-row v-for="menu in menus" :key="menu.index">
      <v-col>
        <v-icon>
          mdi-{{ menu.type }}
        </v-icon>
      </v-col>
      <v-col>
        <p>{{ menu.name }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="white" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M18 6H6V9H4V4H20V9H18V6Z"></path>
          <path d="M4 15H6V18H18V15H20V20H4V15Z"></path>
          <path d="M2 11H22V13H2V11Z"></path>
        </svg>
      </v-col>
      <v-col>
        <p>区切り線</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    menus: Array
  },
  mounted() {
    this.$emit('display')
  },
  beforeDestroy() {
    this.$emit('hide')
  }
}
</script>

<style lang="scss" scoped>
  #menu-list-wrapper {
    margin-left: 50px;
    padding: 20px 0;
  }

  p {
    margin: 0;
  }
</style>