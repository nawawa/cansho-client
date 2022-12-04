<template>
  <PartsEditorBubbleMenuContainer>

    <PartsEditorBubbleMenuButton 
      v-for="menu in menus" :key="menu.index"
      @click="clickEvent(menu.type)"
      :class="{ 'is-active': isActive(menu.type) }"
    >
      <!-- h2 h3 に未対応なのをなんとかする -->
      <PartsEditorAlternativeVuetifyIcon
        v-if="menu.type === 'alt'"
      >
        <add-alt-button-svg />
      </PartsEditorAlternativeVuetifyIcon>
      <v-icon 
        v-else
      >
        {{ menu.iconName }}
      </v-icon>
    </PartsEditorBubbleMenuButton>

  </PartsEditorBubbleMenuContainer>
</template>

<script>
import AddAltButtonSVG from '~/components/Parts/Editor/BubbleMenu/Button/SVG/Alt.vue'
export default {
  components: {
    AddAltButtonSVG,
  },
  props: {
    menus: Array,
    executeBubbleMenuButton: Function,
    isActiveBubbleMenuButton: Function
  },
  computed: {
    isActive() {
      return (menuType) => {
        return this.isActiveBubbleMenuButton(menuType)
      }
    }
  },
  methods: {
    clickEvent(menuType) {
      return this.executeBubbleMenuButton(menuType)
    }
  }
}
</script>