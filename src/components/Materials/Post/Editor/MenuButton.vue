<template>
  <button aria-label="メニューを開く" :style="`width: 100px; height:100px; position:absolute; background:black; top: ${rectY}px;`">
    <div />
  </button>
</template>

<script>
export default {
  props: {
    rectY: Number
  }
}
</script>

<style lang="scss" scoped>

</style>