<template>
  <v-row class="pa-2 menu-list-item ma-0" align-content="center" tag="button">
    <v-col cols="2" class="pa-1">
      <slot />
    </v-col>
    <v-col class="py-1 pl-8 menu-list-item-text">
      <div class="menu-list-item-text">
        {{ itemName }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    itemName: String
  }
}
</script>

<style lang="scss" scoped>
  .menu-list-item {
    border-top: 1px solid #b0badd;
    width: 100%;
  }

  .menu-list-item:hover {
    background: #8694c5;
  }

  .menu-list-item-text {
    padding-top: 2.5px;
    font-size: 14px !important;
    text-align: left;
  }
</style>