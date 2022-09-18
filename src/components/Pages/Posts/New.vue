<template>
  <div>
    <!-- TODO：スタイルをつけるボタンの実装 エディタ全体のデザイン -->
    <client-only>
      <textarea contenteditable="true" placeholder="記事タイトル" v-model="title"></textarea>
      <editor v-model="content" />
    </client-only>
  </div>
</template>

<script>
import Editor from '~/components/Materials/Post/Editor/Index.vue'
export default {
  components: {
    Editor
  },
  data: () => ({
    title: '',
    content: '',
  }),
}
</script>

<style lang="scss" scoped>
  textarea {
    width: 100%;
    height: 50px;
    font-size: 32px;
    line-height: 1.5;
    resize: none;
    outline-style: none;
    caret-color: white;
  }
  textarea::placeholder {
    color: white;
    opacity: 0.5;
  }
</style>