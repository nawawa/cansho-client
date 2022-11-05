<template>
  <button aria-label="メニューを開く" :style="`top: ${rectY}px; left: ${rectX}px`">
    <div />
  </button>
</template>

<script>
export default {
  props: {
    rectY: Number,
    rectX: Number
  }
}
</script>

<style lang="scss" scoped>
  button {
    width: 40px; 
    height: 40px; 
    position: absolute; 
    background: black;
  }
</style>