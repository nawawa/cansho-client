<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  div {
    padding: 8px;
    width: 10px;
    height: 10px;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
  }
</style>