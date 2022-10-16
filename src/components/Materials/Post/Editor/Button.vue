<template>
  <v-btn 
    :class="{ 'is-active': editor.isActive(buttonType) }"
    @click="$emit('click')"
    tile
    icon
  >
    <v-icon 
      class="toolbar-button"
    >
      <slot />
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    buttonType: String,
    editor: Object
  }
}
</script>