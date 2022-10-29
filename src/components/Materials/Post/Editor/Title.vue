<template>
  <textarea 
    id="post-title"
    ref="textarea"
    :style="styles"
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
    textareaHeight: '50px'
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
    styles() {
      return { "height": this.textareaHeight}
    }
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
      this.textareaHeight = "auto"
      this.$nextTick(()=>{
        this.textareaHeight = `${this.$refs.textarea.scrollHeight}px`
      })
    }
  },
  watch: {
    title() {
      this.resize()
    }
  },
  mounted() {
    this.resize()
  }
}
</script>

<style lang="scss" scoped>
  #post-title {
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