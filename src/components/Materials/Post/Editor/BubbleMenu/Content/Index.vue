<template>
  <PartsEditorBubbleMenuContainer>
    <!-- class="isActive" の渡し方はいったん保留 -->
    <!-- :buttonClass="{ 'is-active': editor.isActive(button.type) }" -->
    <PartsEditorBubbleMenuButton 
      v-for="menu in menus" :key="menu.index"
      @click="clickEvent(menu.type)"
    >
      {{ menu.iconName }}
    </PartsEditorBubbleMenuButton>
  </PartsEditorBubbleMenuContainer>
</template>

<script>
export default {
  props: {
    menus: Array,
    executeBubbleMenuButton: Function
  },
  methods: {
    clickEvent(menuType) {
      return this.executeBubbleMenuButton(menuType)
    }
  }
}
</script>