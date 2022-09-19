<template>
  <div>
    <!-- TODO：スタイルをつけるボタンの実装 エディタ全体のデザイン -->
    <client-only>
      <textarea 
        id="post-title"
        contenteditable="true" 
        placeholder="記事タイトル" 
        v-model="title"
        wrap="off"
        @keydown.enter.prevent="cancel"
        @compositionstart="composing=true"
        @compositionend="composing=false"
      ></textarea>
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
    composing: false,
    title: '',
    content: '',
  }),
  methods: {
    cancel(e) {
      if (this.composing) {
        return 
      } else {
        const textarea = document.getElementById('post-title')
        const editor = document.getElementsByClassName('ProseMirror')[0]
        textarea.blur()
        editor.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #post-title {
    width: 100%;
    height: 50px;
    font-size: 32px;
    line-height: 1.5;
    resize: none;
    outline-style: none;
    caret-color: white;
    white-space: pre-wrap;
    word-wrap: break-word;
    letter-spacing: 0.04em;
  }
  #post-title::placeholder {
    color: white;
    opacity: 0.5;
    font-family: 'Noto Sans JP', sans-serif !important;
  }
</style>