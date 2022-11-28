<template>
  <button
    :style="`
      width: ${size}px; height: ${size}px;
      top: ${size / 2}px; right: ${size / 2}px;
    `"
    aria-label="アイキャッチ画像を削除する"
    @click="$emit('click')"
  >
    <svg :width="size" :height="size" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29" cy="29" r="20" transform="rotate(45 29 29)" fill="#5A6CA2"/>
      <path d="M22.2656 21.8167L35.7343 35.2854" stroke="white" stroke-width="2" stroke-linecap="square"/>
      <path d="M22.2656 35.2854L35.7343 21.8167" stroke="white" stroke-width="2" stroke-linecap="square"/>
    </svg>
  </button>
</template>

<script>
export default {
  data: () => ({
    color: `#adb5bd`,
    size: 32
  })
}
</script>

<style lang="scss" scoped>
  button {
    position: absolute;
    border-radius: 50%;
    background: var(--v-main-base);
    opacity: 0.7;
    text-align: center;
  }
</style>