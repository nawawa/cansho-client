<template>
  <div>
    <editor-content class="pt-9" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import HighLight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    editor: null,
    placeholders: [
      'ようこそ。ご自由にお書きください。'
    ]
  }),
  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
      this.addClickEventToContents()
    },
  },
  beforeMount() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        HighLight,
        TextAlign,
        Placeholder.configure({
          placeholder: this.placeholders[0] // 配列からランダムに取得する
        }),
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
        this.addClickEventToContents()
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    /**
     * エディタに入力されたコンテンツにクリックイベントを付与する
     */
    addClickEventToContents() {
      const pElements = document.querySelectorAll('p, h1, h2, h3')
      const pElementsArray = [...pElements]

      pElementsArray.forEach(p => {
        p.onclick  = () => {
          this.displayEditMenuButton(p)
        }
      })
    },
    displayEditMenuButton(pElement) {
      console.log(pElement.innerText)
    }
  }
}
</script>