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

  .v-enter-active {
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
        transform: translateY(0px);
      }
    }
  }

  .v-leave-active {
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