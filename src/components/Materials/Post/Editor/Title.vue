<template>
  <textarea 
    id="post-title"
    ref="textarea"
    :style="`height: ${textareaHeight};`"
    contenteditable="true" 
    placeholder="記事タイトル" 
    v-model="titleValue"
    @input="resizeFromWordCount"
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
    maximumNumberOfCharactersPerLine: 0
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
    resizeFromWordCount(){
      const textareaMinHeightNumber = 52
      
      this.textareaHeight = `auto`
      
      this.$nextTick(() => {
        const scrollHeight = this.$refs.textarea.scrollHeight
        const rows = (this.$refs.textarea.value.length >= this.maximumNumberOfCharactersPerLine) ? 
          Math.ceil(Number(scrollHeight / textareaMinHeightNumber)): 
          1
        this.textareaHeight = `${textareaMinHeightNumber * rows}px`
      })
    }
  },
  mounted() {
    const styles = window.getComputedStyle(this.$refs.textarea)
    const textareaWidth = styles.getPropertyValue('width').replace('px', '')
    const textareaFontSize = styles.getPropertyValue('font-size').replace('px', '')

    this.maximumNumberOfCharactersPerLine = textareaWidth / textareaFontSize
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
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "ヒラギノ角ゴ ProN W3", Arial, メイリオ, Meiryo, sans-serif;
    font-weight: bold;
    line-height: 1.5;
    resize: none;
    outline-style: none;
    caret-color: white;
    white-space: pre-wrap;
    word-wrap: break-word;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  #post-title::placeholder {
    color: white;
    opacity: 0.5;
    font-family: 'Noto Sans JP', sans-serif !important;
  }
</style>