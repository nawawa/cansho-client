<template>
  <button 
    :style="`width: ${width}; height: ${height};`" 
    aria-label="メニューを開く"
    @click="$emit('toggleMenuList')"
  >
    <svg :width="width" :height="height" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1588 19.6825H29.2064" stroke="white" stroke-width="2" stroke-linecap="square"/>
      <path d="M19.6826 29.2063L19.6826 10.1587" stroke="white" stroke-width="2" stroke-linecap="square"/>
      <circle cx="20" cy="20" r="19.5" stroke="white"/>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number
  }
}
</script>

<style lang="scss" scoped>
  button {
    position: absolute; 
  }
</style>