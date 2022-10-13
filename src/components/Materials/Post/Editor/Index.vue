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

      const targetElement = e.target
   
      if (this.isEditorButton(targetElement)) {
        return window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
      }

      const isToolbarDisplayed = this.isToolbarDisplayed()

      if (
        targetElement === window.getSelection().anchorNode.parentElement &&
        isToolbarDisplayed === true
      ) {
        this.hideToolbar()
        return window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
      }


      if (isToolbarDisplayed === true) {
        this.hideToolbar()
        window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
      }

      const isToolbarHided = (this.toolbarStyle === '') || (this.toolbarStyle === `opacity:0;`)
      
      /**
       * ターゲットがエディタ内コンテンツだったらツールバーを表示するかどうか判断する
       */
      if (
        ['P', 'EM', 'STRONG', 'U', 'H1', 'H2', 'H3'].includes(targetElement.tagName) &&
        isToolbarHided === true
      ) {
        return window.addEventListener('mouseup', this.displayToolbarIfSelected, false)
      } else {
        this.hideToolbar()
        return window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
      }
    },
    /**
     * マウスダウンイベントのターゲットがツールバー自体かどうかをクラス名で判定
     */
    isEditorButton(targetElement) {
      return targetElement.classList.contains('toolbar-button')
    },
    /**
     * マウスアップ時点でSelectionオブジェクトがテキストを所持していればツールバーを表示させない
     */
    displayToolbarIfSelected(e) {
      /**
       * https://benborgers.com/posts/tiptap-selection より引用
       * 選択状態のテキストノードが空白かの真偽値を取得
       */
      const currentSelectionIsEmpty = this.currentSelectionIsEmpty()

      /**
       * 選択された要素の座標を取得
       */
      const clientRect = window.getSelection().anchorNode.parentElement.getBoundingClientRect()
      
      if (currentSelectionIsEmpty === true) {
        return (e.detail === 3) ? this.displayToolbar(clientRect): this.hideToolbar()
      } else if(currentSelectionIsEmpty === false) {
        return this.displayToolbar(clientRect)
      }
    },
    isToolbarDisplayed() {
      return document.getElementById('toolbar-div').style.opacity === '1'
    },
    currentSelectionIsEmpty() {
      return this.editor.view.state.selection.empty
    },
    displayToolbar({left, top}) {
      this.toolbarStyle = `opacity:1; left: ${left}px; top:${top}px; display: block; z-index: 1000;`
    },
    hideToolbar() {
      this.toolbarStyle = `opacity:0;`
    },
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  destroyed() {
    window.removeEventListener('mousedown', this.checkSelectionState, false)
    window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
  }
}
</script>