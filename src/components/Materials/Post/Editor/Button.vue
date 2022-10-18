<template>
  <v-btn 
    :class="buttonClass"
    tile
    icon
    color="white"
    @click="$emit('click')"
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
    buttonClass: Object
  }
}
</script>