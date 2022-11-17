<template>
  <div id="menu-list-wrapper">
    <h1>挿入</h1>
    <v-row v-for="menu in menus" :key="menu.index" class="pa-2 menu-list-item" align-content="center">
      <v-col cols="2" class="pa-1">
        <v-icon>
          mdi-{{ menu.type }}
        </v-icon>
      </v-col>
      <v-col class="py-1 pl-8 menu-list-item-text">
        <div class="menu-list-item-text">
          {{ menu.name }}
        </div>
      </v-col>
    </v-row>
    <v-row class="pa-2 menu-list-item" align-content="center">
      <v-col cols="2" class="pa-1">
        <i class="v-icon notranslate mdi theme--dark">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12H24" stroke="white" stroke-width="4"/>
            <path d="M0 20H19" stroke="white" stroke-width="2"/>
            <path d="M0 4H15" stroke="white" stroke-width="2"/>
          </svg>
        </i>
      </v-col>
      <v-col class="py-1 pl-8">
        <div class="menu-list-item-text">
          区切り線
        </div>
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
    padding: 12px;
    background: var(--v-main-base);
  }

  .menu-list-item {
    border-top: 1px solid white;
  }

  h1 {
    height: 36px;
    font-size: 12px !important;
    line-height: 12px;
    font-weight: normal;
    color: #b5bdda;
  }

  .menu-list-item-text {
    padding-top: 2.5px;
    font-size: 14px !important;
  }
</style>