<template>
  <PartsEditorMenuListContainer>

    <PartsEditorMenuListHeader />
    <PartsEditorMenuListItem 
      v-for="menu in menus" :key="menu.index"
      :itemName="menu.name"
    >
      <v-icon>
        mdi-{{ menu.type }}
      </v-icon>
    </PartsEditorMenuListItem>
    <PartsEditorMenuListItem
      :itemName="`区切り線`"
    >
      <i class="v-icon notranslate mdi theme--dark">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12H24" stroke="white" stroke-width="4"/>
          <path d="M0 20H19" stroke="white" stroke-width="2"/>
          <path d="M0 4H15" stroke="white" stroke-width="2"/>
        </svg>
      </i>
    </PartsEditorMenuListItem>

  </PartsEditorMenuListContainer>
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