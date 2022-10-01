<template>
  <div>
    <edit-button-container />
    <div class="mx-10">
      <title-column v-model="title" @enter="focusOnEditor" />
      <editor-content class="pt-9" :editor="editor" />
    </div>
  </div>
</template>

<script>
import TitleColumn from '~/components/Materials/Post/Editor/Title.vue'
import EditButton from '~/components/Materials/Post/Editor/Button.vue'
import EditButtonContainer from '~/components/Materials/Post/Editor/ButtonContainer.vue'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import HighLight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  components: {
    EditorContent,
    TitleColumn,
    EditButton,
    EditButtonContainer
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
    title: '',
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
     * エディタに入力されたコンテンツ（DOM要素）にクリックイベントを付与する
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
    },

    /**
     * タイトル欄でエンターしたらエディタへフォーカスを移動する
     */
    focusOnEditor() {
      const editor = document.getElementsByClassName('ProseMirror')[0]
      editor.focus()
    }
  }
}
</script>