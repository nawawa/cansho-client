<template>
  <figure>
    <PartsEditorEyecatchDeleteButton @click="unset" />
    <img :src="src" alt="eyecatch">
  </figure>
</template>

<script>
export default {
  props: {
    src: String,
    unsetEyecatch: Function 
  },
  methods: {
    unset() {
      this.unsetEyecatch()
    }
  }
}
</script>

<style lang="scss" scoped>
  figure {
    position: relative;
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: top;
  }
</style>