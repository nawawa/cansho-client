<template>
  <textarea 
    id="post-title"
    ref="textarea"
    rows="1"
    :style="`height: ${textareaHeight};`"
    contenteditable="true" 
    placeholder="記事タイトル" 
    v-model="titleValue"
    @keydown="resize"
    @keydown.enter.prevent="cancel"
    @compositionstart="composing=true"
    @compositionend="composing=false"
  ></textarea>
</template>

<script>
export default {
  data: () => ({
    composing: false,
    textareaHeight: '52px',
  }),
  model: {
    prop: "title",
    event: "input"
  },
  props: {
    title: String
  },
  computed: {
    titleValue: {
      get() {
        return this.title
      },
      set(inputValue) {
        this.$emit("input", inputValue);
      },
    },
  },
  methods: {
    cancel(e) {
      if (this.composing) {
        return 
      } else {
        const textarea = document.getElementById('post-title')
        textarea.blur()
        this.$emit('enter')
      }
    },
    resize(){
      this.textareaHeight = `auto`
      // 1行に設定してしまうことで強引に似たような挙動を実現することはできた
      // ただ、note も最初から 2行になる事情は同じようだったので
      // 今のままではリサイズがスムーズではないため、なんとか rows 属性以外で行数を管理する方法を探りたい
      // 文字数で行数を判定するくらいしか思いつかないけど…
      this.$nextTick(() => {
        const scrollHeight = this.$refs.textarea.scrollHeight
        console.log(scrollHeight, this.$refs.textarea.rows)

        this.textareaHeight = `${this.$refs.textarea.scrollHeight}px`
      })
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  #post-title {
    padding: 2px;
    width: 100%;
    min-height: 52px;
    margin: 32px 0 12px;
    font-size: 32px;
    font-weight: bold;
    line-height: 1.5;
    resize: none;
    outline-style: none;
    caret-color: white;
    white-space: pre-wrap;
    word-wrap: break-word;
    letter-spacing: 0.04em;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  #post-title::placeholder {
    color: white;
    opacity: 0.5;
    font-family: 'Noto Sans JP', sans-serif !important;
  }
</style>