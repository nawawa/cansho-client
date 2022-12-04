<template>
  <PartsEditorBubbleMenuContainer>

    <PartsEditorBubbleMenuButton 
      v-for="menu in menus" :key="menu.index"
      @click="clickEvent(menu.type)"
      :class="{ 'is-active': isActive(menu)}"
    >
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
    /**
     * isActive に渡す引数はひとつだったり二つだったりする
     * ひとつのときは type を渡す
     * ふたつのときは activeCheckParam という配列を持っているのでそれを展開して渡す
     */
    isActive() {
      return ({ type, activeCheckParam }) => {
        return (activeCheckParam === undefined) ? 
          this.isActiveBubbleMenuButton(type):
          this.isActiveBubbleMenuButton(...activeCheckParam)
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