<template>
  <textarea 
    id="post-title"
    ref="textarea"
    :style="`height: ${textareaHeight};`"
    contenteditable="true" 
    placeholder="記事タイトル" 
    v-model="titleValue"
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

      this.$nextTick(() => {
        const scrollHeight = this.$refs.textarea.scrollHeight
        console.log(scrollHeight) // 一文字でも入力した時点で2行分の高さになってしまう なぜ？
        // 一行でも2行でも 100 に変わりがない
        
        // const rows = Math.ceil(Number(scrollHeight / 52))
        // this.textareaHeight = `${52 * rows}px`
      })
    }
  },
  watch: {
    title() {
      this.resize()
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
  #post-title {
    padding: 2px 0;
    width: 100%;
    min-height: 1em;
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