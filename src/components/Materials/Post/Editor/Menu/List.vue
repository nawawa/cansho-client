<template>
  <PartsEditorMenuListContainer 
    :transformStyleValue="getTransformPropertyValueFromMenuButton"
  >

    <PartsEditorMenuListHeader />
    <PartsEditorMenuListItem 
      v-for="menu in menus" :key="menu.index"
      :itemName="menu.name"
      @click="insert"
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
    menus: Array,
    insertContent: Function
  },
  mounted() {
    this.$emit('display')
  },
  beforeDestroy() {
    this.$emit('hide')
  },
  computed: {
    /**
     * 並べて表示するため、メニューボタンの transformプロパティの値を取得する
     */
    getTransformPropertyValueFromMenuButton() {
      const {transform} = document.getElementById('tippy-2').style
      return transform
    },
  },
  methods: {
    insert() {
      this.insertContent('クリックしたよ')
    }
  }
}
</script>