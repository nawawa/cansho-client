<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$emit('display')
  },
  beforeDestroy() {
    this.$emit('hide')
  }
}
</script>

<style lang="scss" scoped>
  div {
    width: 50px;
    height: 50px;
    background: black;
    margin-left: 50px;
  }
</style>