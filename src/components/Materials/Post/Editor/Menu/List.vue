<template>
  <div id="menu-list-wrapper">
    <h1>挿入</h1>
    <v-row v-for="menu in menus" :key="menu.index" class="py-2">
      <v-col cols="1" class="py-0">
        <v-icon>
          mdi-{{ menu.type }}
        </v-icon>
      </v-col>
      <v-col class="py-0 pl-8">
        <p>{{ menu.name }}</p>
      </v-col>
    </v-row>
    <v-row class="py-2">
      <v-col cols="1" class="py-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="white" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M18 6H6V9H4V4H20V9H18V6Z"></path>
          <path d="M4 15H6V18H18V15H20V20H4V15Z"></path>
          <path d="M2 11H22V13H2V11Z"></path>
        </svg>
      </v-col>
      <v-col class="py-0 pl-8">
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
    border: 1px solid white;
    border-radius: 4px;
    margin-left: 50px;
    padding: 10px;
    background: var(--v-main-base);
  }

  h1 {
    font-size: 14px !important;
    padding-bottom: 12px;
    font-weight: normal;
  }

  p {
    margin: 0;
    padding-top: 2.3px;
    font-size: 14px !important;
  }
</style>