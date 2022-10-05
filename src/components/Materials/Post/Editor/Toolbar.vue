<template>
  <div id="toolbar-div" :style="styleAttribute">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    styleAttribute: String
  }
}
</script>

<style lang="scss" scoped>
  #toolbar-div {
    position: absolute;
    opacity: 0;
  }
</style>