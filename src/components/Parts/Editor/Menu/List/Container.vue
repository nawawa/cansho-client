<template>
  <div id="menu-list-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  #menu-list-wrapper {
    border: 1px solid white;
    border-radius: 4px;
    margin-left: 50px;
    padding: 12px;
    background: var(--v-main-base);
  }
</style>