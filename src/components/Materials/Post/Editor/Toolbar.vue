<template>
  <div id="toolbar-div" :style="styleAttribute" :class="classAttribute">
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
    position: absolute;
    opacity: 0;
    display: none;
    background: var(--v-main-base);
  }

  .display {
    filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.3));

    /*
     * https://coco-factory.jp/ugokuweb/move02/4-1/ よりコピペ 
     */
    animation-name:fadeUpAnime;
    animation-duration:0.3s;
    animation-fill-mode:forwards;
    @keyframes fadeUpAnime{
      from {
        opacity: 0;
        transform: translateY(10px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .hide {
    animation-name:fadeOutAnime;
    animation-duration:0.3s;
    animation-fill-mode:forwards;
    @keyframes fadeOutAnime{
      from {
        opacity: 1;
        transform: translateY(0px);
      }

      to {
        opacity: 0;
        transform: translateY(10px);
      }
    }
  }
</style>