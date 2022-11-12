<template>
  <div id="toolbar-div">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    styleAttribute: String,
    classAttribute: String
  }
}
</script>

<style lang="scss" scoped>
  #toolbar-div {
    background: var(--v-main-base);
    filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.3));
  }
</style>