<template>
  <div id="menu-button-container">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  #menu-button-container {
    position: absolute;
    height: 100%;
    width: 40px;
    margin-left: -40px;
    background: black
  }
</style>