<template>
  <v-btn 
    :class="$attrs"
    tile
    icon
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
}
</script>