<template>
  <v-btn 
    :class="$attrs"
    tile
    icon
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .is-active {
    background: #7887b7;
  }
</style>