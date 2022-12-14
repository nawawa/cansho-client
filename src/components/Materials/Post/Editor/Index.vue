<template>
  <div>
    <bubble-menu 
      :editor="editor"
      :tippy-options="{ 
        duration: 300,
      }"
      v-if="editor"
      :shouldShow="isBubbleMenuShouldShow"
    >
      <!-- TODO: 見出しのときはボールド等を出さない -->
      <bubble-menu-content 
        :menus="toggleBubbleMenuContent"
        :executeBubbleMenuButton="executeBubbleMenuButton"
        :isActiveBubbleMenuButton="isActiveBubbleMenuButton"
      />

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
        id="menu-button"
        :width="menu.button.widthAndHeight"
        :height="menu.button.widthAndHeight"
        @toggleMenuList="toggleMenuList"
      />
    </floating-menu>
    
    <transition name="fade">
      <menu-list 
        v-if="menu.button.isAvailable" 
        @display="menu.list.isDisplayed = true"
        @hide="menu.list.isDisplayed = false"
        :insertContent="insertContent"
        :menus="menu.list.items"
      />
    </transition>

    <editor-content class="pt-9" :editor="editor" />

    <input 
      id="cansho-editor-image-upload" 
      type="file" accept="image/jpeg,image/png,image/gif" 
      multiple="" 
      style="display: none;"
      @change="uploadImage"
    >
  </div>
</template>

<script>
import MenuButton from '~/components/Materials/Post/Editor/Menu/Button.vue'
import MenuList from '~/components/Materials/Post/Editor/Menu/List.vue'
import { Editor, EditorContent, FloatingMenu, BubbleMenu, posToDOMRect } from '@tiptap/vue-2'
import BubbleMenuContent from '~/components/Materials/Post/Editor/BubbleMenu/Content/Index.vue'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import HighLight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Image from '@tiptap/extension-image'

export default {
  components: {
    MenuButton,
    MenuList,
    FloatingMenu,
    EditorContent,
    BubbleMenu,
    BubbleMenuContent
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
    bubbleMenu: null,
    menu: null
  }),
  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
    'menu.list.isDisplayed': function(value) {
      if (value === true) {
        document.addEventListener('mousedown', this.closeMenuListIfClickedButton, false)
      } else {
        document.removeEventListener('mousedown', this.closeMenuListIfClickedButton, false)
      }
    }
  },
  beforeMount() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold.extend({
          addKeyboardShortcuts() {
            return { 'Mod-b': () => {
              return this.editor.isActive('paragraph') ? this.editor.commands.toggleBold(): false
            }}
          }
        }),
        Italic.extend({
          addKeyboardShortcuts() {
            return { 'Mod-i': () => {
              return this.editor.isActive('paragraph') ? this.editor.commands.toggleItalic(): false
            }}
          }
        }),
        Strike.extend({
          addKeyboardShortcuts() {
            return { 'Mod-Shift-x': () => {
              return this.editor.isActive('paragraph') ? this.editor.commands.toggleStrike(): false
            }}
          }
        }),
        BubbleMenu,
        HighLight,
        TextAlign,
        Placeholder.configure({
          placeholder: this.placeholders[0] // 配列からランダムに取得する
        }),
        Heading.configure({
          levels: [2, 3],
        }),
        Image,
        ListItem,
        OrderedList,
        BulletList
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
      onSelectionUpdate: () => {
        /**
         * 行が増えたときにボールド等の装飾が引き継がれるのを防止する
         */
        this.editor.chain().selectNodeForward().unsetBold().unsetItalic().unsetStrike().run()
      }
    })

    /**
     * TODO: この部分を別メソッド化
     * TODO: toolbar と bubble-menu で表記がごちゃごちゃしているのでHTMLの属性もろとも後者に統一する
     */
    this.bubbleMenu = {
      buttonTypes: [
        {
          type: 'bold',
          iconName: 'mdi-format-bold',
        },
        {
          type: 'italic',
          iconName: 'mdi-format-italic',
        },
        {
          type: 'h2',
          activeCheckParam: ['heading', {level: 2}],
          iconName: 'mdi-format-header-2'
        },
        {
          type: 'h3',
          activeCheckParam: ['heading', {level: 3}],
          iconName: 'mdi-format-header-3'
        },
        {
          type: 'link',
          iconName: 'mdi-link'
        },
        {
          type: 'alt',
          iconName: 'ALT'
        },
        {
          type: 'delete',
          iconName: 'mdi-delete'
        },
      ]
    }

    this.menu = {
      button: {
        widthAndHeight: 40,
        left: 0,
        isAvailable: false,
      },
      list: { 
        isDisplayed: false,
        /**
         * タイプはそのまま HTML タグに使う
         */
        items: [
          {
            type:  'img',
            iconType: 'image',
            name: '画像'
          },
          {
            type:  'a',
            iconType: 'link',
            name: '埋め込み'
          },
          {
            type:  'div',
            iconType: 'movie-open-plus',
            name: '映画情報'
          },
          {
            type:  'h2',
            iconType: 'format-header-2',
            name: '見出し'
          },
          {
            type:  'h3',
            iconType: 'format-header-3',
            name: '小見出し'
          },
          {
            type:  'bulletList',
            iconType: 'format-list-bulleted',
            name: '箇条書きリスト'
          },
          {
            type:  'orderedList',
            iconType: 'format-list-numbered',
            name: '数字付きリスト'
          },
          {
            type:  'figure',
            iconType: 'format-quote-close',
            name: '引用'
          }
        ]
      }
    }
  },
  mounted() {
    window.addEventListener('DOMContentLoaded', this.setMenuButtonLeft, false)
  },
  computed: {
    isActiveContent() {
      const isSelectionNotEmpty = this.editor.view.state.selection.empty === false
      const isEditorNotEmpty = this.editor.isEmpty === false
      return isSelectionNotEmpty && isEditorNotEmpty
    },
    isOnlyActiveImage() {
      return this.editor.isActive('image') === true && this.isOnlyActiveTextContent === false
    },
    isOnlyActiveParagraph() {
      const activeParagraph = this.editor.isActive('paragraph') === true
      return activeParagraph && this.isActiveContent === true
    },
    isOnlyActiveHeading() {
      const activeParagraph = this.editor.isActive('heading') === true
      return activeParagraph && this.isActiveContent === true
    },
    toggleBubbleMenuContent() {
      if (this.isOnlyActiveParagraph === true) {
        return this.filterToBeDisplayedButtons(['bold', 'italic', 'link', 'h2', 'h3'])
      }
      else if (this.isOnlyActiveImage === true) {
        return this.filterToBeDisplayedButtons(['link', 'alt', 'delete'])
      }
      else if (this.isOnlyActiveHeading === true) {
        return this.filterToBeDisplayedButtons(['h2', 'h3', 'link'])
      }
    }
  },
  methods: {
    isBubbleMenuShouldShow() {
      return this.isActiveContent
    },
    isActiveBubbleMenuButton(type, ...level) {
      return this.editor.isActive(type, ...level)
    },
    filterToBeDisplayedButtons(toBeDisplayedButtons) {
      return this.bubbleMenu.buttonTypes.filter((item) =>  {
        return toBeDisplayedButtons.includes(item.type)
      })
    },
    setMenuButtonLeft() {
      const emptyP = document.getElementsByClassName('is-empty')[0]
      const pRectLeft = emptyP.getBoundingClientRect().left
      this.menu.button.left = pRectLeft - (this.menu.button.widthAndHeight * 3)
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
      const halfButtonSize = this.menu.button.widthAndHeight / 2
      const halfHeight = height / 2

      return {
        width: this.menu.button.widthAndHeight,
        height: 0,
        left: this.menu.button.left,
        right: 200,
        top: top - halfButtonSize + halfHeight,
      }
    },
    toggleMenuList() {
      this.menu.button.isAvailable = !this.menu.button.isAvailable
    },
    closeMenuListIfClickedButton(e) {
      const targetIsNotMenuButtonOrMenuListItem = 
        e.target.closest('#menu-button') === null && 
        e.target.closest('.menu-list-item') === null

      if (targetIsNotMenuButtonOrMenuListItem) {
        return this.menu.button.isAvailable = false
      } else {
        return 
      }
    },
    uploadImage(selectedFile) {
      // ローカル環境ではアップロードしない
      const url = (this.$config.NODE_ENV === 'local') ? `https://picsum.photos/800/400`: ''

      return this.displayImage(url)
    },
    displayImage(url) {
      this.editor.commands.insertContent(`<img src="${url}">`)
      this.editor.commands.enter()
      this.editor.commands.focus('end')
    },
    /**
     * 挿入ボタンで表示するメニューを使い、エディタ内に要素を挿入する
     */
    insertContent(type) {
      this.editor.commands.enter()

      switch (type) {
        case 'img':
          document.getElementById('cansho-editor-image-upload').click()
          break
        case 'h2':
        case 'h3':
          this.editor.commands.insertContent(`<${type}></${type}>`)
          this.editor.commands.focus('end')
          break
        case 'bulletList':
          this.editor.chain().focus().toggleBulletList().run()
          this.editor.commands.focus('end')
          break
        case 'orderedList':
          this.editor.chain().focus().toggleOrderedList().run()
          this.editor.commands.focus('end')
          break
        default:
          return this.toggleMenuList()
      }

      return this.toggleMenuList()
    },
    /**
     * 文字選択で表示するメニューを使い、要素を装飾する
     */
    executeBubbleMenuButton(type) {
      switch (type) {
        case 'bold': 
          this.editor.chain().focus().toggleBold().run()
          break
        case 'italic': 
          this.editor.chain().focus().toggleItalic().run()
          break
        case 'h2':
          this.resetContent()
          this.editor.chain().focus().toggleHeading({ level: 2 }).run()
          break
        case 'h3':
          this.resetContent()
          this.editor.chain().focus().toggleHeading({ level: 3 }).run()
          break
        default:
          return
      }
    },
    /**
     * 見出し要素は装飾させない
     * テキストが見出しに変換された際に装飾をリセットする
     */
    resetContent() {
      ['bold', 'italic', 'underline'].forEach((markUpType) => {
        if (this.isActiveBubbleMenuButton(markUpType) === true) {
          switch (markUpType) {
            case 'bold': 
              this.editor.chain().focus().unsetBold().run()
              break
            case 'italic': 
              this.editor.chain().focus().unsetItalic().run()
              break
            case 'underline': 
              this.editor.chain().focus().unsetUnderline().run()
              break
            default:
              return
          }
        }
      })
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  destroyed() {
    window.removeEventListener('DOMContentLoaded', this.setMenuButtonLeft, false)
  }
}
</script>