<template>
  <div id="menu-list-wrapper" :style="`transform: ${transformStyleValue}`">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    transformStyleValue: String,
  }
}
</script>

<style lang="scss" scoped>
  #menu-list-wrapper {
    position: absolute;
    z-index: 9999;
    inset: 0px auto auto 0px;
    border: 1px solid white;
    border-radius: 4px;
    margin-left: 50px;
    background: var(--v-main-base);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>