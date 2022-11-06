<template>
  <div>
    <menu-button :rectY="menuButton.rectY" :rectX="60" />
    <toolbar 
      :styleAttribute="toolbar.positionStyle"
      :classAttribute="toolbar.classAttribute"
      ref="toolbar"
    >
      <MaterialsPostEditorButton 
        v-for="button in toolbar.buttons" :key="button.index"
        :buttonClass="{ 'is-active': editor.isActive(button.type) }"
        :buttonType="button.type"
        :editor="editor"
        @click="markContent(button.type)"
      >
        mdi-format-{{ button.type }}
      </MaterialsPostEditorButton>

      <MaterialsPostEditorButton 
        v-for="headingLevel in [1,2,3]" :key="headingLevel.index"
        :buttonType="[`heading`, { level: headingLevel }]"
        :editor="editor"
        @click="editor.chain().focus().toggleHeading({ level: headingLevel }).run()"
      >
        mdi-format-header-{{ headingLevel }}
      </MaterialsPostEditorButton>
    </toolbar>
    <editor-content class="pt-9" :editor="editor" />
  </div>
</template>

<script>
import MenuButton from '~/components/Materials/Post/Editor/MenuButton.vue'
import EditButton from '~/components/Materials/Post/Editor/Button.vue'
import Toolbar from '~/components/Materials/Post/Editor/Toolbar.vue'
import { Editor, EditorContent } from '@tiptap/vue-2'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import HighLight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  components: {
    EditorContent,
    MenuButton,
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
    toolbar: null,
    menuButton: null
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
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Image
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
      onSelectionUpdate: () => {
        this.toggleToolbar(),
        this.moveMenuBarButtonToCursorRow()
      },
      onFocus() {
        // 一番上の段落へメニューボタン配置
      },
    })

    this.toolbar = {
      positionStyle: '',
      classAttribute: 'hide',
      width: 0,
      buttons: [
        {
          type: 'bold',
        },
        {
          type: 'italic',
        },
        {
          type: 'underline',
        },
      ]
    },

    this.menuButton = {
      rectY: 0
    }
  },
  methods: {
    moveMenuBarButtonToCursorRow() {
      const selection = window.getSelection()
      if (selection.rangeCount !== 0) {

        const {y, height} = window.getSelection().getRangeAt(0).getBoundingClientRect()
        const targetElementStyles = window.getComputedStyle(selection.focusNode.parentElement)
        const fontSize = Number(targetElementStyles.getPropertyValue('font-size').replace('px', ''))

        this.menuButton.rectY = this.calculateMenuButtonRectY({
          elementTagName: selection.focusNode.parentElement.tagName, 
          selectionRectY: y, 
          headerElementHeight: 56, 
          selectionHeight: height, 
          targetFontSize: fontSize
        })
      }
    },
    /**
     * メニューボタンを表示する縦の座標を計算する
     * 
     * @param {String} elementTagName カーソル位置の行のHTML要素名
     * @param {Number} selectionRectY Selectionオブジェクトの縦位置
     * @param {Number} headerElementHeight ヘッダー(v-app-bar)の縦幅
     * @param {Number} selectionHeight Selectionオブジェクトの縦幅
     * @param {Number} targetFontSize カーソル位置の本文のフォントサイズ
     * 
     * @return {Number} メニューボタンの top プロパティに指定する数値 
     */
    calculateMenuButtonRectY({elementTagName, selectionRectY, headerElementHeight, selectionHeight, targetFontSize}) {
      switch (elementTagName) {
        case 'P':
        case 'U':
        case 'EM':
        case 'STRONG':
          return selectionRectY - headerElementHeight - (selectionHeight / 2)
        case 'H1':
          return selectionRectY - headerElementHeight - 1.5
        case 'H2':
          return selectionRectY - headerElementHeight - (targetFontSize / 3)
        case 'H3':
          return selectionRectY - headerElementHeight - (selectionHeight / 2) + 1.5
        default: 
          return selectionRectY
      }
    },
    markContent(type) {
      switch (type) {
        case 'bold': 
          this.editor.chain().focus().toggleBold().run()
          break
        case 'italic': 
          this.editor.chain().focus().toggleItalic().run()
          break
        case 'underline': 
          this.editor.chain().focus().toggleUnderline().run()
          break
        default:
          return
      }
    },
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
      const isTargetIsContent = ['P', 'EM', 'STRONG', 'U', 'H1', 'H2', 'H3'].includes(targetElement.tagName)
      const allSelect = e.detail === 3
      const isToolbarDisplayed = this.isToolbarDisplayed()
   
      if (this.isEditorButton(targetElement)) {
        return window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
      }

      if (
        targetElement === window.getSelection().anchorNode.parentElement && // マウスダウンのイベントターゲットが選択されている要素と同一であること
        isToolbarDisplayed === true && 
        allSelect === false
      ) {
        this.hideToolbar()
        return window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
      }

      if (isToolbarDisplayed === true) {
        this.hideToolbar()
        window.removeEventListener('mouseup', this.displayToolbarIfSelected, false)
      }

      /**
       * ターゲットがエディタ内コンテンツだったらツールバーを表示するかどうか判断する
       */
      if (
        (isTargetIsContent && isToolbarDisplayed === false) ||
        (isTargetIsContent && allSelect === true)
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
      const selection = window.getSelection()
      const domRect = selection.getRangeAt(0).getClientRects()[0]

      if (currentSelectionIsEmpty === true) {
        return (e.detail === 3) ? this.displayToolbar(domRect): this.hideToolbar()
      } else if(currentSelectionIsEmpty === false) {
        return this.displayToolbar(domRect)
      }
    },
    isToolbarDisplayed() {
      return this.toolbar.classAttribute === `display`
    },
    currentSelectionIsEmpty() {
      return this.editor.view.state.selection.empty
    },
    displayToolbar({left, top, width, height}) {
      /**
       * 選択範囲の横幅の半分 - ツールバーの横幅の半分 で選択範囲とツールバーの中心を合わせる
       */
      this.$refs.toolbar.$el.style.display = 'block'
      if (this.toolbar.width === 0) {
        this.toolbar.width = this.$refs.toolbar.$el.clientWidth
      }
      const halfSelectionLength = (Math.floor(width) / 2) - (this.toolbar.width / 2)
      
      this.toolbar.classAttribute = `display`
      this.toolbar.positionStyle = `left: ${left + halfSelectionLength}px; top:${top - (height * 3 + 40)}px; display:block; z-index: 1000;`
    },
    hideToolbar() {
      this.toolbar.classAttribute = `hide`
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