<template>
  <div>
    <bubble-menu 
      :editor="editor"
      :tippy-options="{ 
        duration: 300,
      }"
      v-if="editor"
    >
      <bubble-menu-content-container>
        <bubble-menu-content-button 
          v-for="button in toolbar.buttons" :key="button.index"
          :buttonClass="{ 'is-active': editor.isActive(button.type) }"
          :buttonType="button.type"
          :editor="editor"
          @click="markContent(button.type)"
        >
          mdi-format-{{ button.type }}
        </bubble-menu-content-button>

        <bubble-menu-content-button  
          v-for="headingLevel in [1,2,3]" :key="headingLevel.index"
          :buttonType="[`heading`, { level: headingLevel }]"
          :editor="editor"
          @click="editor.chain().focus().toggleHeading({ level: headingLevel }).run()"
        >
          mdi-format-header-{{ headingLevel }}
        </bubble-menu-content-button>
      </bubble-menu-content-container>
    </bubble-menu>

    <floating-menu 
      :editor="editor" 
      v-if="editor" 
      :should-show="() => true"
      :tippy-options="{
        getReferenceClientRect: getMenuButtonRect
      }"
    >
      <menu-button 
        ref="menuButton"
        :width="menuButton.widthAndHeight"
        :height="menuButton.widthAndHeight"
      />
    </floating-menu>
    
    <editor-content class="pt-9" :editor="editor" />
  </div>
</template>

<script>
import MenuButton from '~/components/Materials/Post/Editor/Menu/Button.vue'
import { Editor, EditorContent, FloatingMenu, BubbleMenu, posToDOMRect } from '@tiptap/vue-2'
import BubbleMenuContentButton from '~/components/Materials/Post/Editor/BubbleMenu/Content/Button.vue'
import BubbleMenuContentContainer from '~/components/Materials/Post/Editor/BubbleMenu/Content/Container.vue'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import HighLight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  components: {
    MenuButton,
    FloatingMenu,
    EditorContent,
    BubbleMenu,
    BubbleMenuContentButton,
    BubbleMenuContentContainer
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
    menuButton: {
      widthAndHeight: 40,
      left: 0,
    }
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
        BubbleMenu,
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
    })

    this.toolbar = {
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
    }
  },
  mounted() {
    window.addEventListener('DOMContentLoaded', this.setMenuButtonLeft, false)
  },
  methods: {
    setMenuButtonLeft() {
      const emptyP = document.getElementsByClassName('is-empty')[0]
      const pRectLeft = emptyP.getBoundingClientRect().left
      this.menuButton.left = pRectLeft - (this.menuButton.widthAndHeight * 3)
    },
    /**
     * Selection の座標を取得する
     */
    getMenuButtonRect() {
      const editorView = this.editor.view
      const { ranges } = editorView.state.selection
      const from = Math.min(...ranges.map(range => range.$from.pos))
      const to = Math.max(...ranges.map(range => range.$to.pos))

      return this.calculateMenuButtonPosition(posToDOMRect(editorView, from, to))
    },
    /**
     * Selection の座標からメニューボタンの表示位置を計算する
     */
    calculateMenuButtonPosition({top, height}) {
      const halfButtonSize = this.menuButton.widthAndHeight / 2
      const halfHeight = height / 2

      return {
        width: this.menuButton.widthAndHeight,
        height: 0,
        left: this.menuButton.left,
        right: 200,
        top: top - halfButtonSize + halfHeight,
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
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  destroyed() {
    window.removeEventListener('DOMContentLoaded', this.setMenuButtonLeft, false)
  }
}
</script>