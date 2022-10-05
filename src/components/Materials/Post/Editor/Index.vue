<template>
  <div>
    <toolbar :styleAttribute="`opacity: 1; top: 161px; left: 127px`">
    <!-- <toolbar :styleAttribute="toggleToolbar()"> -->
      <MaterialsPostEditorButton 
        :buttonType="`bold`"
        :editor="editor"
        @click="editor.chain().focus().toggleBold().run()"
      >
        mdi-format-bold
      </MaterialsPostEditorButton>

      <MaterialsPostEditorButton 
        :buttonType="`italic`"
        :editor="editor"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        mdi-format-italic
      </MaterialsPostEditorButton>

      <MaterialsPostEditorButton 
        :buttonType="`underline`"
        :editor="editor"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        mdi-format-underline
      </MaterialsPostEditorButton>
    </toolbar>
    <div class="post-width">
      <title-column v-model="title" @enter="focusOnEditor" />
      <editor-content class="pt-9" :editor="editor" />
    </div>
  </div>
</template>

<script>
import TitleColumn from '~/components/Materials/Post/Editor/Title.vue'
import EditButton from '~/components/Materials/Post/Editor/Button.vue'
import Toolbar from '~/components/Materials/Post/Editor/Toolbar.vue'
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
    Toolbar
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
    editorElement: null,
    title: null,
    placeholders: [
      'ようこそ。ご自由にお書きください。'
    ],
    isToolbarDisplayable: true
  }),
  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
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
      },
      onSelectionUpdate: () => {
        this.toggleToolbar()
      },
    })
  },
  mounted() {
    window.addEventListener('DOMContentLoaded', this.getEditorElement, false)
  },
  methods: {
    getEditorElement() {
      this.editorElement = document.getElementsByClassName('ProseMirror')[0]
    },
    /**
     * タイトル欄でエンターしたらエディタへフォーカスを移動する
     */
    focusOnEditor() {
      this.editorElement.focus()
    },
    /**
     * 選択したテキストの上部にツールバーを表示する
     */
    toggleToolbar() {
      this.editorElement.addEventListener('mousedown', this.selectCheck, false)
      this.editorElement.addEventListener('mouseup', this.displayToolbarIfSelected, false)
    },
    selectCheck() {
      /**
       * https://benborgers.com/posts/tiptap-selection より引用
       */
      const selection = this.editor.view.state.selection
      const currentSelectionIsEmpty = selection.empty

      if (currentSelectionIsEmpty) {
        /**
         * マウスダウン時、選択中のテキストが存在しない
         */
        this.isToolbarDisplayable = true
      } else {
        /**
         * マウスダウン時、選択中のテキストが存在する
         */
        this.isToolbarDisplayable = false
      }
    },
    displayToolbarIfSelected() {
      if (this.isToolbarDisplayable) {
        console.log('ツールバー表示')
      } else {
        console.log('ツールバー非表示')
      }
    }
  },
  computed: {
    style() {
      return `opacity:1`
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  destroyed() {
    this.editorElement.removeEventListener('mouseup', this.selectCheck, false)
    this.editorElement.removeEventListener('mousedown', this.displayToolbarIfSelected, false)
    window.removeEventListener('DOMContentLoaded', this.getEditorElement, false)
  }
}
</script>