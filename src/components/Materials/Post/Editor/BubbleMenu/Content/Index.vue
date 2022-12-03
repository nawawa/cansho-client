<template>
  <PartsEditorBubbleMenuContainer>
    <!-- class="isActive" の渡し方はいったん保留 -->
    <!-- :buttonClass="{ 'is-active': editor.isActive(button.type) }" -->
    <PartsEditorBubbleMenuButton 
      v-for="menu in menus" :key="menu.index"
      @click="clickEvent(menu.type)"
    >
      <i 
        v-if="menu.type === 'alt'"
        class="v-icon notranslate mdi theme--dark"
      >
        <add-alt />
      </i>
      <v-icon 
        v-else
      >
        {{ menu.iconName }}
      </v-icon>
    </PartsEditorBubbleMenuButton>
  </PartsEditorBubbleMenuContainer>
</template>

<script>
import AddAlt from '~/components/Parts/Editor/BubbleMenu/ButtonSVG/Alt.vue'
export default {
  components: {
    AddAlt
  },
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