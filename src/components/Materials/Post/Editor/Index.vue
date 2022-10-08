<template>
  <div>
    <toolbar :styleAttribute="toolbarStyle">
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
    <editor-content class="pt-9" :editor="editor" />
  </div>
</template>

<script>
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
    title: null,
    placeholders: [
      'ようこそ。ご自由にお書きください。'
    ],
    toolbarStyle: ''
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
  methods: {
    /**
     * 選択したテキストの上部にツールバーを表示する
     */
    toggleToolbar() {
      window.addEventListener('mousedown', this.checkSelectionState, false)
    },
    /**
     * マウスダウン時点で、Selectionオブジェクトがテキストを所持していたらツールバーを表示させない
     */
    checkSelectionState(e) {
      /**
       * https://benborgers.com/posts/tiptap-selection より引用
       */
      const selection = this.editor.view.state.selection

      if (selection.content().content.size === 0) {
        window.addEventListener('mouseup', this.displayToolbarIfSelected, false)
      } else {
        window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
        this.hideToolbar()
      }
    },
    /**
     * マウスアップ時点でSelectionオブジェクトがテキストを所持していればツールバーを表示させない
     */
    displayToolbarIfSelected(e) {
      /**
       * https://benborgers.com/posts/tiptap-selection より引用
       * マウスダウン時、選択状態のテキストノードが空白かの真偽値を取得
       */
      const selection = this.editor.view.state.selection
      const currentSelectionIsEmpty = selection.empty

      // e.target がpから外れてしまうのでツールバーの表示位置が変になる
      const clientRect = e.target.getBoundingClientRect()

      if (currentSelectionIsEmpty) {
        return (e.detail === 3) ? this.displayToolbar(clientRect): this.hideToolbar()
      } else {
        return this.displayToolbar(clientRect)
      }
    },
    displayToolbar({left, top}) {
      console.log(left, top)
      this.toolbarStyle = `opacity:1; left: ${left}px; top:${top}px;`
    },
    hideToolbar() {
      this.toolbarStyle = `opacity:0;`
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  destroyed() {
    window.removeEventListener('mousedown', this.test, false)
    window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
  }
}
</script>